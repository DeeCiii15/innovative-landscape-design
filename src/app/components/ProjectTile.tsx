import Image from "next/image";
import Link from "next/link";
import { getProjectCover } from "@/lib/loadProjects";
import { workItemPath, type WorkItem } from "@/lib/workData";

export function ProjectTile({ item, serviceSlug }: { item: WorkItem; serviceSlug?: string }) {
  const cover = getProjectCover(item, serviceSlug);

  return (
    <Link
      href={workItemPath(item.slug)}
      className="project-tile focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
    >
      {cover.src ? (
        <Image
          src={cover.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="project-tile__image object-cover"
        />
      ) : null}
      <span className="project-tile__name">{item.name}</span>
    </Link>
  );
}
