import Link from "next/link";
import type { ServiceDef } from "@/lib/servicesData";

type ServiceIconType = ServiceDef["icon"];

const icons: Record<ServiceIconType, React.ReactNode> = {
  landscaping: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 3-4 5.5-4 9a4 4 0 108 0c0-3.5-2.5-6-4-9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14M9 21v-4m6 4v-3" />
    </svg>
  ),
  lighting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  irrigation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 3-4 5.5-4 9a4 4 0 108 0c0-3.5-2.5-6-4-9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 21c1.5-2 3-3 4-3s2.5 1 4 3" />
    </svg>
  ),
  hardscapes: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16M8 4v16M16 4v16" />
    </svg>
  ),
  "water-features": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 3v8c0 2.2-2 3.2-2 6M12 3v11c0 2-1.5 3-1.5 5M17 3v8c0 2.2-2 3.2-2 6M5 20h14" />
    </svg>
  ),
  kitchens: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16M6 10V7a2 2 0 012-2h8a2 2 0 012 2v3M8 14v5m8-5v5M4 19h16" />
    </svg>
  ),
  drainage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l8 4 8-4M4 12l8 4 8-4M4 16l8 4 8-4" />
    </svg>
  ),
  lawn: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c2-4 4-7 8-7s6 3 8 7M8 10c.8-2 1.8-4 4-6 2.2 2 3.2 4 4 6" />
    </svg>
  ),
  seasonal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3M12 18v3M4.9 6.3l2.1 2.1M17 15.6l2.1 2.1M3 12h3M18 12h3M4.9 17.7L7 15.6M17 8.4l2.1-2.1" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  ),
  garden: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V11M8 21h8M7 11c0-3 2-6 5-8 3 2 5 5 5 8H7z" />
    </svg>
  ),
  maintenance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19h16M7 19V9l5-4 5 4v10M10 19v-4h4v4" />
    </svg>
  ),
};

export function ServiceIcon({ type }: { type: ServiceIconType }) {
  return (
    <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--color-accent-light)] text-[var(--color-accent)]">
      {icons[type]}
    </div>
  );
}

export function ServiceRow({
  number,
  title,
  summary,
  icon,
  href,
}: {
  number: string;
  title: string;
  summary: string;
  icon: ServiceIconType;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group grid gap-6 border-b border-[var(--color-border-light)] py-8 transition hover:bg-[var(--color-warm)]/60 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-8 sm:px-4"
    >
      <span className="service-number">{number}</span>
      <div className="flex gap-4 sm:gap-5">
        <ServiceIcon type={icon} />
        <div>
          <h3 className="text-lg font-medium tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-green)]">
            {title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">{summary}</p>
        </div>
      </div>
      <span className="hidden text-sm font-semibold text-[var(--color-green)] sm:inline-flex sm:items-center sm:gap-1">
        Learn more
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 transition group-hover:translate-x-0.5" aria-hidden>
          <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
        </svg>
      </span>
    </Link>
  );
}
