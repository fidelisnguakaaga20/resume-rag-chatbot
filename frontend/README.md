# Resume RAG Chatbot (Local, FastAPI + Sentence Transformers + Next.js)

Upload your resume PDF and ask questions about it.  
This runs completely **locally** using sentence-transformer embeddings and simple vector search.

This project fits into my **MASTER LLM ENGINEERING ROADMAP** as:

- Month 2 → RAG + FastAPI + Next.js  
- Month 3 → Project 2: **Resume RAG Chatbot**

No paid APIs, no cloud hosting — everything runs on my laptop.

---

## 🎥 Demo (Loom + YouTube)

- 🎥 Loom: `<https://www.loom.com/share/f895833d582d443c8362bd38258364fe?from_recorder=1&focus_title=1>`
- 🎥 YouTube (Unlisted): `<https://youtu.be/O3s2rzXd53M>` 

The demo shows:

1. Backend starting:  
   `uvicorn 07_fastapi_rag_api:app --reload --port 8000`
2. Frontend running on `http://localhost:3001`
3. Uploading `resume.pdf` and seeing **“Resume uploaded. Chunks indexed: ?”**
4. Asking questions like:
   - “Summarize my resume experience for an LLM engineer role.”
   - “What backend technologies do I have experience with?”
   - “How many years of experience do I have with Next.js / React?”
5. Short architecture explanation: **Next.js → FastAPI → local sentence-transformer embeddings (no OpenAI).**

---

## 🧠 What This App Does

- Loads your **resume PDF** from `backend/data/resume.pdf` or via the upload form.
- Extracts text from the PDF.
- Splits the text into overlapping chunks.
- Creates embeddings using **sentence-transformers/all-MiniLM-L6-v2**.
- Stores the embeddings in memory (NumPy array).
- On each question:
  - Embeds the question.
  - Finds the most similar chunks via **cosine similarity**.
  - Returns those chunks as an answer with a small explanatory header.
- Exposes a **FastAPI `/rag` endpoint** for the Next.js frontend.

Everything is CPU-only and runs offline once the model is downloaded.

---

## 🏗 Tech Stack

**Backend**

- Python 3.11+
- FastAPI
- Uvicorn
- pypdf
- sentence-transformers (all-MiniLM-L6-v2)
- NumPy

**Frontend**

- Next.js
- TypeScript
- React
- Fetch-based client calling `POST /rag` and `POST /upload-resume`

---

## 📂 Project Structure

```text
resume-rag-chatbot/
  backend/
    data/
      resume.pdf        # your resume file
    07_fastapi_rag_api.py
    requirements.txt
    .venv/              # local venv, NOT committed

  frontend/
    app/
      page.tsx          # main UI
    public/
    styles/
    package.json
    next.config.ts
    ...

  .gitignore
  README.md             # this file
  file-tree.txt


🚀 How to Run (Local Only)
1. Backend (FastAPI + local embeddings)
cd backend
python -m venv .venv
source .venv/Scripts/activate    # on Windows Git Bash

pip install -r requirements.txt

uvicorn 07_fastapi_rag_api:app --reload --port 8000


Backend logs should show something like:

Loading resume PDF from: .../data/resume.pdf
Created X chunks.
Loading embedding model: sentence-transformers/all-MiniLM-L6-v2
Resume embeddings ready. RAG is initialized.
Application startup complete.


If resume.pdf is missing, copy your latest CV into:

backend/data/resume.pdf


Then restart the backend.

2. Frontend (Next.js Resume Chat UI)

In another terminal:

cd frontend
npm install      # first time only
npm run dev -- --port 3001


Open:

http://localhost:3001

Flow:

Click Choose File, pick your resume.pdf.

Click Upload & Index.

Wait for the green text: “Resume uploaded. Chunks indexed: ?”

Ask questions in the chat box, for example:

“Summarize my resume experience for an LLM engineer role.”

“What backend technologies do I have experience with?”

“How many years of experience do I have with Next.js / React?”