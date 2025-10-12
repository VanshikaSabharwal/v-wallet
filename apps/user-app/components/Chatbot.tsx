"use client";
import { useState } from "react";

export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askQuestion() {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch(
        "https://v-wallet-chatbot.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        },
      );
      const data = await res.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("Oops, something went wrong. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="w-full px-4 md:px-0 max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-pink-600">
        Chatbot
      </h2>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") askQuestion();
          }}
          disabled={loading}
        />
        <button
          onClick={askQuestion}
          disabled={loading || !question.trim()}
          className={`w-full sm:w-auto px-4 py-2 rounded bg-pink-600 text-white font-semibold hover:bg-pink-700 transition ${
            loading || !question.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "..." : "Ask"}
        </button>
      </div>

      <div className="mt-6 min-h-[80px] p-4 border border-gray-200 rounded bg-gray-50 text-gray-800 whitespace-pre-wrap">
        {answer || "Your answer will appear here..."}
      </div>
    </div>
  );
}
