"use client";

import { FormEvent, useMemo, useState } from "react";

type PredictionResult = {
  prediction: "REAL" | "FAKE" | string;
  confidence: number;
  fake_probability: number;
  real_probability: number;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:8000";

export default function Home() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const wordCount = useMemo(() => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }, [text]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText || isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: trimmedText }),
      });

      if (!response.ok) {
        throw new Error(`Prediction request failed (${response.status})`);
      }

      const data = (await response.json()) as PredictionResult;
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Prediction failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const predictionTone =
    result?.prediction === "REAL"
      ? "from-emerald-400/25 to-cyan-500/15 border-emerald-400/30"
      : "from-rose-400/25 to-orange-500/15 border-rose-400/30";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.22),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.18),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.16),_transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,8,22,0.4),rgba(5,8,22,0.88))]" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
              BERT-powered fake news analyzer
            </div>

            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Paste any news story and get an instant{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-transparent">
                  REAL or FAKE
                </span>{" "}
                prediction.
              </h1>
              <p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                A sleek, dark, glassmorphism interface for your fake-news detection
                model. Enter the article text, press analyze, and inspect confidence
                plus probability scores in one clean result card.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-sm text-slate-400">Model</p>
                <p className="mt-1 text-lg font-semibold text-white">Fine-tuned BERT</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-sm text-slate-400">Workflow</p>
                <p className="mt-1 text-lg font-semibold text-white">Paste, analyze, review</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="text-sm text-slate-400">Output</p>
                <p className="mt-1 text-lg font-semibold text-white">Prediction + confidence</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-fuchsia-400/10 to-transparent blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/8 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl sm:p-6">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="news-text"
                    className="text-sm font-medium text-slate-200"
                  >
                    News article text
                  </label>
                  <textarea
                    id="news-text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Paste the full news article or a substantial excerpt here..."
                    className="min-h-56 w-full resize-none rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4 text-sm leading-6 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/40 focus:ring-4 focus:ring-cyan-400/10"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{wordCount} words</span>
                    <span>Recommended: at least a few paragraphs for best results</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !text.trim()}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/20 border-t-slate-950" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <span>Analyze</span>
                      <span className="transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 space-y-4">
                {error ? (
                  <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                    {error}
                  </div>
                ) : null}

                {result ? (
                  <div
                    className={`rounded-[1.75rem] border bg-gradient-to-br px-5 py-5 shadow-lg backdrop-blur-xl ${predictionTone}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-300">
                          Prediction
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-white">
                          {result.prediction}
                        </h2>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-right">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                          Confidence
                        </p>
                        <p className="mt-1 text-2xl font-semibold text-white">
                          {result.confidence.toFixed(2)}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-slate-950/25 p-4">
                        <p className="text-sm text-slate-300">Fake probability</p>
                        <p className="mt-2 text-2xl font-semibold text-white">
                          {result.fake_probability.toFixed(2)}%
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-slate-950/25 p-4">
                        <p className="text-sm text-slate-300">Real probability</p>
                        <p className="mt-2 text-2xl font-semibold text-white">
                          {result.real_probability.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-white/5 px-5 py-6 text-sm text-slate-400">
                    Your prediction card will appear here after analysis.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
