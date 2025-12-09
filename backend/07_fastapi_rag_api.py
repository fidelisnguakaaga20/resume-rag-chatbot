# 07_fastapi_rag_api.py
"""
FastAPI backend for resume RAG + utility endpoints.

Current endpoints:
- GET  /health         -> basic health check
- POST /upload-resume  -> upload a new resume PDF and rebuild Chroma
- POST /embed          -> return embedding vector for input text
- POST /search         -> semantic search over Chroma resume DB
- POST /rag            -> RAG answer + supporting chunks
- POST /chat           -> plain LLM chat (no retrieval)
- POST /agent          -> simple agent that routes between RAG and chat
"""

import os
from typing import List, Optional, Literal

from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from sentence_transformers import SentenceTransformer
from transformers import AutoModelForCausalLM, AutoTokenizer

import torch
import chromadb

# LangChain bits used only for rebuilding the DB from a PDF
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter


# ---------------------------------------------------------
# GLOBAL CONFIG
# ---------------------------------------------------------

EMBEDDING_MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
LLM_MODEL_NAME = "gpt2"

# Must match your 06_langchain_resume_rag.py script
CHROMA_DIR = "chroma_db_resume_api"
COLLECTION_NAME = "resume_chunks"

# Where the current resume PDF is stored
RESUME_PDF_PATH = os.path.join("data", "sample.pdf")


# ---------------------------------------------------------
# GLOBAL MODEL & DB INITIALIZATION
# ---------------------------------------------------------

embedding_model = SentenceTransformer(EMBEDDING_MODEL_NAME)

tokenizer = AutoTokenizer.from_pretrained(LLM_MODEL_NAME)
llm_model = AutoModelForCausalLM.from_pretrained(LLM_MODEL_NAME)

chroma_client = chromadb.PersistentClient(path=CHROMA_DIR)

try:
    collection = chroma_client.get_collection(name=COLLECTION_NAME)
except Exception as e:
    raise RuntimeError(
        f"Chroma collection '{COLLECTION_NAME}' not found in '{CHROMA_DIR}'. "
        "Run 06_langchain_resume_rag.py OR call /upload-resume once to build it."
    ) from e


# ---------------------------------------------------------
# FASTAPI APP + CORS
# ---------------------------------------------------------

app = FastAPI(title="Resume RAG API")

# Allow Next.js dev (localhost:3000) to call the API
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# Pydantic MODELS
# ---------------------------------------------------------

class EmbedRequest(BaseModel):
    text: str


class EmbedResponse(BaseModel):
    embedding: List[float]
    dim: int


class SearchRequest(BaseModel):
    query: str
    k: int = 5


class SearchResult(BaseModel):
    document: str
    score: float


class SearchResponse(BaseModel):
    results: List[SearchResult]


class RagRequest(BaseModel):
    query: str
    k: int = 5
    max_new_tokens: int = 128


class RagChunk(BaseModel):
    text: str
    score: float


class RagResponse(BaseModel):
    answer: str
    chunks: List[RagChunk]


class ChatRequest(BaseModel):
    message: str
    max_new_tokens: int = 128
    system_prompt: Optional[str] = (
        "You are a helpful AI assistant. Answer clearly and concisely."
    )


class ChatResponse(BaseModel):
    reply: str


class AgentRequest(BaseModel):
    message: str
    mode: Literal["auto", "resume", "chat"] = "auto"
    max_new_tokens: int = 128


class AgentResponse(BaseModel):
    reply: str
    used_tool: Literal["rag", "chat"]


class UploadResumeResponse(BaseModel):
    status: str
    chunks_indexed: int


# ---------------------------------------------------------
# UTILS
# ---------------------------------------------------------

def encode_text(text: str) -> List[float]:
    emb = embedding_model.encode([text], normalize_embeddings=True)[0]
    return emb.tolist()


def generate_answer(prompt: str, max_new_tokens: int = 128) -> str:
    inputs = tokenizer(prompt, return_tensors="pt")
    with torch.no_grad():
        output_ids = llm_model.generate(
            **inputs,
            max_new_tokens=max_new_tokens,
            do_sample=False,
            pad_token_id=tokenizer.eos_token_id,
        )
    generated = tokenizer.decode(output_ids[0], skip_special_tokens=True)
    return generated[len(prompt) :].strip()


def rebuild_collection_from_pdf(pdf_path: str) -> int:
    """
    Load a resume PDF, split into chunks, embed, and rebuild the Chroma collection.
    Returns: number of chunks indexed.
    """
    global collection

    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF not found at {pdf_path}")

    loader = PyPDFLoader(pdf_path)
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100,
    )
    chunks = splitter.split_documents(docs)
    texts = [d.page_content for d in chunks]

    if not texts:
        raise ValueError("No text chunks extracted from PDF.")

    try:
        chroma_client.delete_collection(name=COLLECTION_NAME)
    except Exception:
        pass

    collection = chroma_client.get_or_create_collection(name=COLLECTION_NAME)

    embeddings = embedding_model.encode(texts, normalize_embeddings=True)

    ids = [f"chunk-{i}" for i in range(len(texts))]
    metadatas = [{"chunk_index": i} for i in range(len(texts))]

    collection.add(
        ids=ids,
        documents=texts,
        metadatas=metadatas,
        embeddings=embeddings,
    )

    return len(texts)


def run_rag(query: str, k: int, max_new_tokens: int) -> RagResponse:
    query_embedding = encode_text(query)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=k,
        include=["documents", "distances"],
    )

    documents = results.get("documents", [[]])[0]
    distances = results.get("distances", [[]])[0]

    if not documents:
        raise HTTPException(status_code=404, detail="No documents found in collection.")

    context_lines = []
    chunks: List[RagChunk] = []
    for doc, dist in zip(documents, distances):
        score = float(1.0 / (1.0 + dist))
        context_lines.append(doc)
        chunks.append(RagChunk(text=doc, score=score))

    context = "\n\n".join(context_lines)

    prompt = (
        "You are an assistant that answers questions based on the resume below.\n\n"
        f"RESUME CONTEXT:\n{context}\n\n"
        f"QUESTION: {query}\n\n"
        "ANSWER:"
    )

    answer = generate_answer(prompt, max_new_tokens=max_new_tokens)

    return RagResponse(answer=answer, chunks=chunks)


# ---------------------------------------------------------
# ENDPOINTS
# ---------------------------------------------------------

@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/upload-resume", response_model=UploadResumeResponse)
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    os.makedirs(os.path.dirname(RESUME_PDF_PATH), exist_ok=True)

    contents = await file.read()
    with open(RESUME_PDF_PATH, "wb") as f:
        f.write(contents)

    try:
        chunks_count = rebuild_collection_from_pdf(RESUME_PDF_PATH)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return UploadResumeResponse(status="ok", chunks_indexed=chunks_count)


@app.post("/embed", response_model=EmbedResponse)
def embed_text(payload: EmbedRequest):
    if not payload.text.strip():
        raise HTTPException(status_code=400, detail="Text must not be empty.")
    embedding = encode_text(payload.text)
    return EmbedResponse(embedding=embedding, dim=len(embedding))


@app.post("/search", response_model=SearchResponse)
def semantic_search(payload: SearchRequest):
    if not payload.query.strip():
        raise HTTPException(status_code=400, detail="Query must not be empty.")

    query_embedding = encode_text(payload.query)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=payload.k,
        include=["documents", "distances"],
    )

    documents = results.get("documents", [[]])[0]
    distances = results.get("distances", [[]])[0]

    search_results: List[SearchResult] = []
    for doc, dist in zip(documents, distances):
        score = float(1.0 / (1.0 + dist))
        search_results.append(SearchResult(document=doc, score=score))

    return SearchResponse(results=search_results)


@app.post("/rag", response_model=RagResponse)
def rag_endpoint(payload: RagRequest):
    if not payload.query.strip():
        raise HTTPException(status_code=400, detail="Query must not be empty.")
    rag_result = run_rag(
        query=payload.query,
        k=payload.k,
        max_new_tokens=payload.max_new_tokens,
    )
    return rag_result


@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(payload: ChatRequest):
    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="Message must not be empty.")

    system = payload.system_prompt or ""
    prompt = (
        f"{system}\n\n"
        f"User: {payload.message}\n"
        "Assistant:"
    )

    reply = generate_answer(prompt, max_new_tokens=payload.max_new_tokens)
    return ChatResponse(reply=reply)


@app.post("/agent", response_model=AgentResponse)
def agent_endpoint(payload: AgentRequest):
    if not payload.message.strip():
        raise HTTPException(status_code=400, detail="Message must not be empty.")

    mode = payload.mode

    if mode == "resume":
        chosen_tool = "rag"
    elif mode == "chat":
        chosen_tool = "chat"
    else:
        text_lower = payload.message.lower()
        resume_keywords = [
            "resume",
            "cv",
            "experience",
            "skills",
            "projects",
            "job history",
            "education",
        ]
        if any(kw in text_lower for kw in resume_keywords):
            chosen_tool = "rag"
        else:
            chosen_tool = "chat"

    if chosen_tool == "rag":
        rag_result = run_rag(
            query=payload.message,
            k=5,
            max_new_tokens=payload.max_new_tokens,
        )
        reply = rag_result.answer
    else:
        system_prompt = (
            "You are a helpful AI assistant. Answer clearly and concisely."
        )
        prompt = (
            f"{system_prompt}\n\n"
            f"User: {payload.message}\n"
            "Assistant:"
        )
        reply = generate_answer(prompt, max_new_tokens=payload.max_new_tokens)

    return AgentResponse(reply=reply, used_tool=chosen_tool)


# To run:
# uvicorn 07_fastapi_rag_api:app --reload
