"use client";

import { type FormEvent } from "react";
import { siteConfig } from "@/lib/siteConfig";

const inputClass =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/15";

export function CareerForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const role = String(data.get("role") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Career inquiry from ${name || "website visitor"}`;
    const body = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Interested in: ${role}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="career-name" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
          Name
        </label>
        <input id="career-name" name="name" type="text" required autoComplete="name" className={inputClass} />
      </div>

      <div>
        <label htmlFor="career-phone" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
          Phone
        </label>
        <input id="career-phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} />
      </div>

      <div>
        <label htmlFor="career-email" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
          Email
        </label>
        <input id="career-email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </div>

      <div>
        <label htmlFor="career-role" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
          What kind of work?
        </label>
        <select id="career-role" name="role" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Select one
          </option>
          <option value="Landscape construction crew">Landscape construction crew</option>
          <option value="Lawn and landscape maintenance">Lawn and landscape maintenance</option>
          <option value="Irrigation">Irrigation</option>
          <option value="Design">Design</option>
          <option value="Office or other">Office or other</option>
        </select>
      </div>

      <div>
        <label htmlFor="career-message" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
          Tell us about yourself
        </label>
        <textarea
          id="career-message"
          name="message"
          rows={5}
          required
          placeholder="Experience, the kind of work you want, and anything else we should know."
          className={`${inputClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="btn-primary w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2"
      >
        Send application
      </button>
    </form>
  );
}
