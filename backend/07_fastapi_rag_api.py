import os
import shutil
from pathlib import Path
from typing import List, Optional, Any

import numpy as np
from fastapi import FastAPI, HTTPException, UploadFile, File, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer

# ---------- CONFIG ----------

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
RESUME_PATH = DATA_DIR / "resume.pdf"

EMBEDDING_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
TOP_K = 5  # how many chunks to use in the answer


# ---------- FASTAPI APP ----------

app = FastAPI(title="Resume RAG API (Local Only)")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class RAGResponse(BaseModel):
    answer: str
    sources: List[str]


# ---------- GLOBAL STATE (LOADED ON STARTUP) ----------

embedding_model: Optional[SentenceTransformer] = None
resume_chunks: List[str] = []
resume_embeddings: Optional[np.ndarray] = None


# ---------- HELPERS ----------

def load_resume_text(path: Path) -> str:
    if not path.exists():
        raise FileNotFoundError(f"Resume file not found at: {path}")

    reader = PdfReader(str(path))
    pages_text: List[str] = []
    for page in reader.pages:
        text = page.extract_text() or ""
        pages_text.append(text)

    full_text = "\n".join(pages_text)
    return full_text


def chunk_text(text: str, chunk_size: int = 400, overlap: int = 80) -> List[str]:
    """Simple character-based chunking."""
    text = text.replace("\r", " ").replace("\n\n", "\n")
    chars = list(text)
    chunks: List[str] = []

    start = 0
    length = len(chars)

    while start < length:
        end = min(start + chunk_size, length)
        chunk = "".join(chars[start:end]).strip()
        if chunk:
            chunks.append(chunk)
        start += chunk_size - overlap

    return chunks


def embed_chunks(model: SentenceTransformer, chunks: List[str]) -> np.ndarray:
    embeddings = model.encode(chunks, batch_size=8, show_progress_bar=False)
    return np.array(embeddings)


def initialize_rag_from_resume(path: Path):
    """
    Load resume from disk, chunk it, and (re)build embeddings.
    Used at startup and after /upload-resume.
    """
    global embedding_model, resume_chunks, resume_embeddings

    print("Loading resume PDF from:", path)
    text = load_resume_text(path)
    if not text.strip():
        raise RuntimeError("Resume PDF is empty or unreadable.")

    print("Chunking resume text...")
    resume_chunks = chunk_text(text, chunk_size=500, overlap=100)
    print(f"Created {len(resume_chunks)} chunks.")

    if embedding_model is None:
        print(f"Loading embedding model: {EMBEDDING_MODEL_NAME}")
        embedding_model = SentenceTransformer(EMBEDDING_MODEL_NAME)

    print("Embedding resume chunks (this happens once per load)...")
    resume_embeddings = embed_chunks(embedding_model, resume_chunks)
    print("Resume embeddings ready. RAG is initialized.")


def retrieve_relevant_chunks(question: str, k: int = TOP_K) -> List[str]:
    global embedding_model, resume_chunks, resume_embeddings

    if embedding_model is None or resume_embeddings is None or not resume_chunks:
        raise RuntimeError("RAG store is not initialized.")

    query_vec = embedding_model.encode(question, show_progress_bar=False)
    query_vec = np.array(query_vec)

    # cosine similarity
    norms = np.linalg.norm(resume_embeddings, axis=1) * np.linalg.norm(query_vec)
    sims = resume_embeddings @ query_vec / (norms + 1e-10)

    top_idx = np.argsort(-sims)[:k]
    return [resume_chunks[i] for i in top_idx]


def build_answer(question: str, context_chunks: List[str]) -> str:
    """
    Local, extractive-style answer: we do NOT call any external LLM.
    We simply return the most relevant resume snippets with a helpful preface.
    """
    context_text = "\n\n---\n\n".join(context_chunks)

    answer = (
        "Here is what I found in the resume related to your question:\n\n"
        f"{context_text}\n\n"
        "(This answer is generated locally by retrieving the most relevant parts "
        "of the resume. No paid API was used.)"
    )
    return answer


def extract_question_from_body(body: Any) -> str:
    """
    Frontend might send {question}, {query}, {message}, etc.
    Accept all to avoid 422 errors.
    """
    if isinstance(body, dict):
        question = (
            body.get("question")
            or body.get("query")
            or body.get("message")
            or body.get("text")
        )
    else:
        question = str(body)

    if not question or not str(question).strip():
        raise HTTPException(status_code=400, detail="Question must not be empty.")

    return str(question).strip()


# ---------- STARTUP ----------

@app.on_event("startup")
def startup_event():
    # Ensure data directory exists
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    # If resume.pdf exists, initialize RAG from it
    if RESUME_PATH.exists():
        initialize_rag_from_resume(RESUME_PATH)
    else:
        print(
            f"Warning: {RESUME_PATH} does not exist yet. "
            "Upload a resume via /upload-resume to initialize RAG."
        )


# ---------- ROUTES ----------

@app.get("/health")
def health():
    initialized = (
        embedding_model is not None
        and resume_embeddings is not None
        and len(resume_chunks) > 0
    )
    return {
        "status": "ok",
        "message": "Resume RAG API (local only) is running.",
        "initialized": initialized,
    }


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    """
    Accepts a PDF, saves it to data/resume.pdf, and rebuilds the RAG store.
    This is what the frontend 'Upload & Index' button should call.
    """
    if file.content_type not in ("application/pdf", "application/octet-stream"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    try:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        temp_path = DATA_DIR / "uploaded_resume.tmp"

        with temp_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Move to final path
        temp_path.replace(RESUME_PATH)

        # Reinitialize RAG with the new resume
        initialize_rag_from_resume(RESUME_PATH)

        return {"status": "ok", "message": "Resume uploaded and indexed successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process resume: {e}")


@app.post("/rag", response_model=RAGResponse)
async def rag_endpoint(request: Request):
    """
    Flexible RAG endpoint that accepts any JSON body and pulls out the question.
    This avoids 422 Unprocessable Entity errors from strict Pydantic validation.
    """
    try:
        body = await request.json()
        print("Received /rag body:", body)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON body.")

    question = extract_question_from_body(body)

    try:
        context = retrieve_relevant_chunks(question)
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))

    answer = build_answer(question, context)
    return RAGResponse(answer=answer, sources=context)
