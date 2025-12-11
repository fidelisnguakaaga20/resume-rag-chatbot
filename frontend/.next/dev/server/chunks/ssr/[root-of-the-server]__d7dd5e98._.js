module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/resume-rag-chatbot/frontend/node_modules/.pnpm/next@16.0.7_@babel+core@7.2_3693f2253032b2a8664d8812647ccbdf/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/resume-rag-chatbot/frontend/node_modules/.pnpm/next@16.0.7_@babel+core@7.2_3693f2253032b2a8664d8812647ccbdf/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const API_BASE = process.env.NEXT_PUBLIC_RAG_API_URL ?? "http://127.0.0.1:8000";
function HomePage() {
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [lastChunks, setLastChunks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uploadStatus, setUploadStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [uploadMessage, setUploadMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    async function handleSend(e) {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed) return;
        const userMessage = {
            role: "user",
            content: trimmed
        };
        setMessages((prev)=>[
                ...prev,
                userMessage
            ]);
        setInput("");
        setLoading(true);
        setLastChunks([]);
        try {
            const res = await fetch(`${API_BASE}/rag`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: trimmed,
                    k: 3,
                    max_new_tokens: 120
                })
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`RAG request failed: ${res.status} ${res.statusText} - ${errorText}`);
            }
            const data = await res.json();
            const assistantMessage = {
                role: "assistant",
                content: data.answer || "(No answer returned)"
            };
            setMessages((prev)=>[
                    ...prev,
                    assistantMessage
                ]);
            setLastChunks(data.chunks ?? []);
        } catch (err) {
            console.error(err);
            const assistantMessage = {
                role: "assistant",
                content: "Sorry, I could not get an answer from the RAG API. Please try again."
            };
            setMessages((prev)=>[
                    ...prev,
                    assistantMessage
                ]);
        } finally{
            setLoading(false);
        }
    }
    function handleFileChange(e) {
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
                body: formData
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Upload failed: ${res.status} ${res.statusText} - ${errorText}`);
            }
            const data = await res.json();
            setUploadStatus("success");
            setUploadMessage(`Resume uploaded. Chunks indexed: ${data.chunks_indexed ?? "?"}`);
            // Clear previous context / messages so you know you’re using the new resume.
            setLastChunks([]);
            setMessages([]);
        } catch (err) {
            console.error(err);
            setUploadStatus("error");
            setUploadMessage("Failed to upload or index resume. Please try again (check backend is running).");
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem",
            maxWidth: "900px",
            margin: "0 auto",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: {
                    marginBottom: "1.5rem"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: "1.8rem",
                            fontWeight: 700
                        },
                        children: "Resume RAG Chatbot"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: "#555",
                            marginTop: "0.25rem"
                        },
                        children: "Upload your resume PDF and ask questions about it. Backend: FastAPI + Chroma + GPT-2."
                    }, void 0, false, {
                        fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    marginBottom: "1.5rem",
                    padding: "1rem",
                    borderRadius: "0.75rem",
                    border: "1px solid #ddd"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontSize: "1.1rem",
                            fontWeight: 600,
                            marginBottom: "0.5rem"
                        },
                        children: "Upload Resume PDF"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: "0.9rem",
                            color: "#555",
                            marginBottom: "0.5rem"
                        },
                        children: [
                            "This sends the PDF to ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                children: "/upload-resume"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                                lineNumber: 174,
                                columnNumber: 33
                            }, this),
                            ", rebuilds the vector DB, and updates what the chatbot knows."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "0.75rem",
                            flexWrap: "wrap",
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                accept: "application/pdf",
                                onChange: handleFileChange
                            }, void 0, false, {
                                fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleUploadResume,
                                disabled: uploadStatus === "uploading",
                                style: {
                                    padding: "0.5rem 1rem",
                                    borderRadius: "999px",
                                    border: "none",
                                    cursor: uploadStatus === "uploading" ? "default" : "pointer",
                                    backgroundColor: uploadStatus === "uploading" ? "#999" : "#111827",
                                    color: "#fff",
                                    fontWeight: 500
                                },
                                children: uploadStatus === "uploading" ? "Uploading..." : "Upload & Index"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    uploadMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            marginTop: "0.5rem",
                            fontSize: "0.9rem",
                            color: uploadStatus === "error" ? "#b91c1c" : uploadStatus === "success" ? "#15803d" : "#555"
                        },
                        children: uploadMessage
                    }, void 0, false, {
                        fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                        lineNumber: 211,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "0.75rem",
                    border: "1px solid #ddd",
                    padding: "1rem",
                    minHeight: "300px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: "auto",
                            marginBottom: "1rem",
                            paddingRight: "0.25rem"
                        },
                        children: [
                            messages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: "#777",
                                    fontSize: "0.95rem"
                                },
                                children: [
                                    "Try asking:",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        children: "Summarize my resume experience for a senior LLM engineer role."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                                        lineNumber: 251,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                                lineNumber: 249,
                                columnNumber: 13
                            }, this),
                            messages.map((msg, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: "0.75rem",
                                        display: "flex",
                                        justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            maxWidth: "80%",
                                            padding: "0.5rem 0.75rem",
                                            borderRadius: "0.75rem",
                                            backgroundColor: msg.role === "user" ? "#111827" : "#e5e7eb",
                                            color: msg.role === "user" ? "#fff" : "#111827",
                                            fontSize: "0.95rem",
                                            whiteSpace: "pre-wrap"
                                        },
                                        children: msg.content
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                                        lineNumber: 267,
                                        columnNumber: 15
                                    }, this)
                                }, idx, false, {
                                    fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                                    lineNumber: 258,
                                    columnNumber: 13
                                }, this)),
                            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: "#555",
                                    fontSize: "0.9rem"
                                },
                                children: "Thinking..."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSend,
                        style: {
                            marginTop: "0.5rem"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                gap: "0.5rem"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: input,
                                    onChange: (e)=>setInput(e.target.value),
                                    placeholder: "Ask a question about your resume...",
                                    style: {
                                        flex: 1,
                                        padding: "0.5rem 0.75rem",
                                        borderRadius: "999px",
                                        border: "1px solid #d1d5db",
                                        fontSize: "0.95rem"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                                    lineNumber: 291,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: loading || !input.trim(),
                                    style: {
                                        padding: "0.5rem 1rem",
                                        borderRadius: "999px",
                                        border: "none",
                                        cursor: loading || !input.trim() ? "default" : "pointer",
                                        backgroundColor: loading || !input.trim() ? "#9ca3af" : "#111827",
                                        color: "#fff",
                                        fontWeight: 500
                                    },
                                    children: "Send"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                                    lineNumber: 304,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                            lineNumber: 290,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this),
                    lastChunks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            marginTop: "1rem",
                            borderTop: "1px solid #e5e7eb",
                            paddingTop: "0.75rem"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    fontSize: "0.95rem",
                                    fontWeight: 600,
                                    marginBottom: "0.5rem"
                                },
                                children: "Retrieved context"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                                lineNumber: 331,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                style: {
                                    listStyle: "disc",
                                    paddingLeft: "1.25rem",
                                    fontSize: "0.9rem",
                                    color: "#374151"
                                },
                                children: lastChunks.map((chunk, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        style: {
                                            marginBottom: "0.5rem"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    whiteSpace: "pre-wrap"
                                                },
                                                children: chunk.text
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                                                lineNumber: 350,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$resume$2d$rag$2d$chatbot$2f$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_$40$babel$2b$core$40$7$2e$2_3693f2253032b2a8664d8812647ccbdf$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "0.75rem",
                                                    color: "#6b7280"
                                                },
                                                children: [
                                                    "score: ",
                                                    chunk.score.toFixed(3)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                                                lineNumber: 351,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                                        lineNumber: 349,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                                lineNumber: 340,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                        lineNumber: 324,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
                lineNumber: 229,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/resume-rag-chatbot/frontend/app/page.tsx",
        lineNumber: 140,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/resume-rag-chatbot/frontend/node_modules/.pnpm/next@16.0.7_@babel+core@7.2_3693f2253032b2a8664d8812647ccbdf/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/Desktop/resume-rag-chatbot/frontend/node_modules/.pnpm/next@16.0.7_@babel+core@7.2_3693f2253032b2a8664d8812647ccbdf/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Desktop/resume-rag-chatbot/frontend/node_modules/.pnpm/next@16.0.7_@babel+core@7.2_3693f2253032b2a8664d8812647ccbdf/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/Desktop/resume-rag-chatbot/frontend/node_modules/.pnpm/next@16.0.7_@babel+core@7.2_3693f2253032b2a8664d8812647ccbdf/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Desktop/resume-rag-chatbot/frontend/node_modules/.pnpm/next@16.0.7_@babel+core@7.2_3693f2253032b2a8664d8812647ccbdf/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d7dd5e98._.js.map