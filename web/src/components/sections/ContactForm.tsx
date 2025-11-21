"use client";

import { FormEvent, useState } from "react";
import { contactApi } from "@/lib/api";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<{ state: "idle" | "loading" | "success" | "error"; message?: string }>({
    state: "idle",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ state: "loading", message: "Sending message..." });

    try {
      const response = await contactApi.submit(form);
      setStatus({ state: "success", message: response.message });
      setForm(initialState);
    } catch (error) {
      setStatus({ state: "error", message: error instanceof Error ? error.message : "Unable to send message" });
    }
  };

  const statusStyles =
    status.state === "error"
      ? "text-rose-200"
      : status.state === "success"
        ? "text-emerald-200"
        : "text-slate-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-white/10 bg-slate-900/60 p-8">
      <div>
        <label className="text-sm font-semibold text-slate-200">Full name</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
          placeholder="Wanjiru Njoroge"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-200">Email</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
          placeholder="you@team.com"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-200">Subject</label>
        <input
          type="text"
          required
          value={form.subject}
          onChange={(event) => setForm({ ...form, subject: event.target.value })}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
          placeholder="Let's collaborate"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-200">Message</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
          placeholder="Tell us about your learners, mentors, and timeline..."
        />
      </div>
      <button
        type="submit"
        disabled={status.state === "loading"}
        className="w-full rounded-2xl bg-indigo-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:bg-indigo-400 disabled:cursor-wait disabled:opacity-70"
      >
        {status.state === "loading" ? "Sending…" : "Send message"}
      </button>
      {status.message && <p className={`text-sm ${statusStyles}`}>{status.message}</p>}
    </form>
  );
}
