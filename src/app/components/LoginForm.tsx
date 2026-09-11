"use client";

import { type FormEvent, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

const inputClass =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/15";

export function LoginForm() {
  const [notice, setNotice] = useState<string | null>(null);
  const phoneDigits = siteConfig.phone.replace(/\D/g, "");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Account login isn't connected on this site yet.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="login-email" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="login-password" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>

      {notice && (
        <p className="rounded-lg bg-[var(--color-surface)] px-4 py-3 text-sm leading-relaxed text-[var(--color-ink-soft)]" role="status">
          {notice}{" "}
          <a href={`tel:${phoneDigits}`} className="font-semibold text-[var(--color-green)] hover:underline">
            Call us
          </a>{" "}
          if you were given an account.
        </p>
      )}

      <button
        type="submit"
        className="btn-primary w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2"
      >
        Sign in
      </button>
    </form>
  );
}
