"use client";

import { ValidationError, useForm } from "@formspree/react";
import { FORMSPREE_CONTACT_ID } from "@/lib/siteConstants";

const inputClass =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-base text-[var(--color-ink)] outline-none transition focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green)]/15 sm:text-sm";

export function ContactForm() {
  const [state, handleSubmit, reset] = useForm(FORMSPREE_CONTACT_ID, {
    data: {
      subject: "Estimate request from the website",
    },
  });

  if (state.succeeded) {
    return (
      <div className="space-y-4">
        <p className="text-[var(--color-ink-soft)]">
          Thanks — we got your message and will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={reset}
          className="btn-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-5">
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="first-name" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
            First name
          </label>
          <input
            id="first-name"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="last-name" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
            Last name
          </label>
          <input
            id="last-name"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" className={inputClass} />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        <ValidationError
          field="email"
          prefix="Email"
          errors={state.errors}
          className="mt-1.5 text-sm text-red-700"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your project — what would you like your 'after' to look like?"
          className={`${inputClass} resize-y`}
        />
        <ValidationError
          field="message"
          prefix="Message"
          errors={state.errors}
          className="mt-1.5 text-sm text-red-700"
        />
      </div>

      <ValidationError errors={state.errors} className="text-sm text-red-700" />

      <button
        type="submit"
        disabled={state.submitting}
        className="btn-primary w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-green)] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
      >
        {state.submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
