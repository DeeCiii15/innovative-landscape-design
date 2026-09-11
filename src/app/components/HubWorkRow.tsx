import Link from "next/link";
import { ProjectTile } from "./ProjectTile";
import { WORK_PATH } from "@/lib/siteConstants";
import type { WorkItem } from "@/lib/workData";

type HubWorkRowProps = {
  items: WorkItem[];
  heading: string;
  lead?: string;
  serviceSlug?: string;
};

export function HubWorkRow({ items, heading, lead, serviceSlug }: HubWorkRowProps) {
  if (items.length === 0) return null;

  return (
    <section className="hub-work" aria-labelledby="hub-work-heading">
      <div className="container-main">
        <div className="hub-work__head">
          <div>
            <h2 id="hub-work-heading" className="heading-section">
              {heading}
            </h2>
            {lead ? <p className="lead mt-4 max-w-2xl">{lead}</p> : null}
          </div>
          <Link
            href={WORK_PATH}
            className="link-arrow hub-work__head-link shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
          >
            View all projects
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <ul className="portfolio-index__grid">
          {items.map((item) => (
            <li key={item.slug}>
              <ProjectTile item={item} serviceSlug={serviceSlug} />
            </li>
          ))}
        </ul>

        <Link
          href={WORK_PATH}
          className="link-arrow hub-work__more focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
        >
          View all projects
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
