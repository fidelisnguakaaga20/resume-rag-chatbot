"use client";

import { useState, FormEvent, ChangeEvent } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type RagChunk = {
  text: string;
  score: number;
};

type RagResponse = {
  answer: string;
  chunks: RagChunk[];
};

type UploadStatus = "idle" | "uploading" | "success" | "error";

const API_BASE =
  process.env.NEXT_PUBLIC_RAG_API_URL ?? "http://127.0.0.1:8000";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [lastChunks, setLastChunks] = useState<RagChunk[]>([]);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadMessage, setUploadMessage] = useState("");

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setLastChunks([]);

    try {
      const res = await fetch(`${API_BASE}/rag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: trimmed,
          k: 3,
          max_new_tokens: 120,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `RAG request failed: ${res.status} ${res.statusText} - ${errorText}`
        );
      }

      const data: RagResponse = await res.json();

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.answer || "(No answer returned)",
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setLastChunks(data.chunks ?? []);
    } catch (err) {
      console.error(err);
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content:
          "Sorry, I could not get an answer from the RAG API. Please try again.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const chosen = e.target.files?.[0] ?? null;
    setFile(chosen);
    setUploadStatus("idle");
    setUploadMessage(chosen ? chosen.name : "");
  }

  async function handleUploadResume() {
    if (!file) {
      setUploadStatus("error");
      setUploadMessage("Please choose a PDF first.");
      return;
    }

    setUploadStatus("uploading");
    setUploadMessage("Uploading and re-indexing resume...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/upload-resume`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          `Upload failed: ${res.status} ${res.statusText} - ${errorText}`
        );
      }

      const data = await res.json();
      setUploadStatus("success");
      setUploadMessage(
        `Resume uploaded. Chunks indexed: ${data.chunks_indexed ?? "?"}`
      );

      // Clear previous context / messages so you know you’re using the new resume.
      setLastChunks([]);
      setMessages([]);
    } catch (err) {
      console.error(err);
      setUploadStatus("error");
      setUploadMessage(
        "Failed to upload or index resume. Please try again (check backend is running)."
      );
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <header style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 700 }}>
          Resume RAG Chatbot
        </h1>
        <p style={{ color: "#555", marginTop: "0.25rem" }}>
          Upload your resume PDF and ask questions about it. Backend: FastAPI +
          Chroma + GPT-2.
        </p>
      </header>

      {/* Upload section */}
      <section
        style={{
          marginBottom: "1.5rem",
          padding: "1rem",
          borderRadius: "0.75rem",
          border: "1px solid #ddd",
        }}
      >
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          Upload Resume PDF
        </h2>
        <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "0.5rem" }}>
          This sends the PDF to <code>/upload-resume</code>, rebuilds the vector
          DB, and updates what the chatbot knows.
        </p>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={handleUploadResume}
            disabled={uploadStatus === "uploading"}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              border: "none",
              cursor: uploadStatus === "uploading" ? "default" : "pointer",
              backgroundColor:
                uploadStatus === "uploading" ? "#999" : "#111827",
              color: "#fff",
              fontWeight: 500,
            }}
          >
            {uploadStatus === "uploading" ? "Uploading..." : "Upload & Index"}
          </button>
        </div>

        {uploadMessage && (
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.9rem",
              color:
                uploadStatus === "error"
                  ? "#b91c1c"
                  : uploadStatus === "success"
                  ? "#15803d"
                  : "#555",
            }}
          >
            {uploadMessage}
          </p>
        )}
      </section>

      {/* Chat section */}
      <section
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: "0.75rem",
          border: "1px solid #ddd",
          padding: "1rem",
          minHeight: "300px",
        }}
      >
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            marginBottom: "1rem",
            paddingRight: "0.25rem",
          }}
        >
          {messages.length === 0 && (
            <p style={{ color: "#777", fontSize: "0.95rem" }}>
              Try asking:{" "}
              <code>
                Summarize my resume experience for a senior LLM engineer role.
              </code>
            </p>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "0.75rem",
                display: "flex",
                justifyContent:
                  msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.75rem",
                  backgroundColor:
                    msg.role === "user" ? "#111827" : "#e5e7eb",
                  color: msg.role === "user" ? "#fff" : "#111827",
                  fontSize: "0.95rem",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <p style={{ color: "#555", fontSize: "0.9rem" }}>Thinking...</p>
          )}
        </div>

        <form onSubmit={handleSend} style={{ marginTop: "0.5rem" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your resume..."
              style={{
                flex: 1,
                padding: "0.5rem 0.75rem",
                borderRadius: "999px",
                border: "1px solid #d1d5db",
                fontSize: "0.95rem",
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                border: "none",
                cursor: loading || !input.trim() ? "default" : "pointer",
                backgroundColor:
                  loading || !input.trim() ? "#9ca3af" : "#111827",
                color: "#fff",
                fontWeight: 500,
              }}
            >
              Send
            </button>
          </div>
        </form>

        {lastChunks.length > 0 && (
          <div
            style={{
              marginTop: "1rem",
              borderTop: "1px solid #e5e7eb",
              paddingTop: "0.75rem",
            }}
          >
            <h3
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              Retrieved context
            </h3>
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "1.25rem",
                fontSize: "0.9rem",
                color: "#374151",
              }}
            >
              {lastChunks.map((chunk, idx) => (
                <li key={idx} style={{ marginBottom: "0.5rem" }}>
                  <div style={{ whiteSpace: "pre-wrap" }}>{chunk.text}</div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                    score: {chunk.score.toFixed(3)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
