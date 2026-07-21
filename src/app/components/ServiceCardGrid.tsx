import Link from "next/link";
import { ServiceIcon } from "./ServiceIcon";
import { services } from "@/lib/servicesData";

export function ServiceCardGrid() {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2">
      {services.map((service) => (
        <Link
          key={service.slug}
          href={`/services/${service.slug}`}
          className="group surface-card flex flex-col p-6 transition hover:-translate-y-0.5 sm:p-7"
        >
          <ServiceIcon type={service.icon} />
          <h3 className="mt-5 text-lg font-bold tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-green)]">
            {service.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{service.intro}</p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)]">
            Learn more
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 transition group-hover:translate-x-0.5" aria-hidden>
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
}
