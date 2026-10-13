"use client";

import { useState } from "react";
import { submitLead } from "@/lib/magic-api";

export function SyllabusForm({
  title = "Get the full syllabus",
  description = "See the week-by-week plan, project briefs, and enrollment options.",
  source = "syllabus",
}: {
  title?: string;
  description?: string;
  source?: "syllabus" | "get-started";
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setStatus("sending");
        setError(null);
        try {
          await submitLead({
            email: String(data.get("email") ?? ""),
            website: String(data.get("website") ?? ""),
            source,
          });
          setStatus("sent");
        } catch (err) {
          setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
          setStatus("idle");
        }
      }}
      className="flex w-full shrink-0 flex-col gap-4 rounded-[10px] bg-canvas p-[26px] lg:w-[430px]"
    >
      <h3 className="text-h4 text-ink">{title}</h3>
      <p className="text-body-s text-ink-2">{description}</p>
      <label className="flex flex-col gap-2">
        <span className="text-label-m text-ink-2">Work email</span>
        <input
          type="email"
          name="email"
          required
          disabled={status === "sent"}
          placeholder="you@company.com"
          className="w-full rounded-[10px] border border-line-strong bg-surface px-4 py-3.5 text-body-m text-ink outline-none placeholder:text-ink-3 focus:border-cyan"
        />
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {error && (
        <p role="alert" className="text-caption text-[#ff7a8a]">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status !== "idle"}
        className="w-full cursor-pointer rounded-full bg-linear-to-r from-violet to-cyan px-7 py-4 text-label-m text-canvas transition hover:brightness-110 disabled:cursor-default disabled:opacity-80"
      >
        {status === "sent" ? "Check your inbox ✓" : status === "sending" ? "Sending…" : "Send me the syllabus"}
      </button>
      <p className="text-caption text-ink-3">
        No spam. One useful email, then you decide.
      </p>
    </form>
  );
}
