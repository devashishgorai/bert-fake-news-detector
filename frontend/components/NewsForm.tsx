"use client";

import { useState } from "react";
import { predictNews } from "@/lib/api";
import type { PredictionResponse } from "@/types/prediction";

export default function NewsForm() {
  const [news, setNews] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!news.trim()) {
      setError("Please enter a news article.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await predictNews(news);
      setResult(response);
    } catch {
      setError("Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 max-w-3xl mx-auto">

      <textarea
        value={news}
        onChange={(e) => setNews(e.target.value)}
        placeholder="Paste your news article here..."
        className="w-full h-64 p-5 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full mt-5 bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold transition"
      >
        {loading ? "Analyzing..." : "Analyze Article"}
      </button>

      {error && (
        <p className="text-red-400 mt-4">{error}</p>
      )}

      {result && (
        <div className="mt-8 rounded-xl bg-slate-800 p-6">

          <h2 className="text-2xl font-bold">
            {result.prediction === "REAL" ? "✅ REAL NEWS" : "❌ FAKE NEWS"}
          </h2>

          <p className="mt-3">
            Confidence: {result.confidence}%
          </p>

          <p>
            Fake Probability: {result.fake_probability}%
          </p>

          <p>
            Real Probability: {result.real_probability}%
          </p>

        </div>
      )}

    </div>
  );
}