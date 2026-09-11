import Image from "next/image";
import Link from "next/link";
import { ProjectTile } from "./ProjectTile";
import { WORK_PATH } from "@/lib/siteConstants";
import type { WorkItem } from "@/lib/workData";

export function PortfolioGrid({ items }: { items: WorkItem[] }) {
  if (items.length === 0) {
    return (
      <p className="text-[var(--color-muted)]">
        Photos coming soon.{" "}
        <Link href={WORK_PATH} className="font-semibold text-[var(--color-brand-dark)] hover:underline">
          Back to the portfolio
        </Link>
      </p>
    );
  }

  return (
    <ul className="portfolio-index__grid">
      {items.map((item) => (
        <li key={item.slug}>
          <ProjectTile item={item} />
        </li>
      ))}
    </ul>
  );
}
