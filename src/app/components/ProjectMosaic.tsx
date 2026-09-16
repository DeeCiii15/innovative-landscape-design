"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectPhoto } from "@/projects/types";

const INITIAL_PHOTOS = 12;

type MosaicRow =
  | { type: "wide"; photos: ProjectPhoto[] }
  | { type: "pair"; photos: ProjectPhoto[] }
  | { type: "triple"; photos: ProjectPhoto[] };

function scrapbookRows(photos: ProjectPhoto[]): MosaicRow[] {
  const rows: MosaicRow[] = [];
  let index = 0;

  while (index < photos.length) {
    const remaining = photos.length - index;

    if (remaining === 1) {
      rows.push({ type: "wide", photos: photos.slice(index, index + 1) });
      break;
    }

    if (remaining === 2) {
      rows.push({ type: "pair", photos: photos.slice(index, index + 2) });
      break;
    }

    rows.push({ type: "wide", photos: photos.slice(index, index + 1) });
    index += 1;

    const afterWide = photos.length - index;
    if (afterWide >= 3) {
      rows.push({ type: "triple", photos: photos.slice(index, index + 3) });
      index += 3;
    } else if (afterWide === 2) {
      rows.push({ type: "pair", photos: photos.slice(index, index + 2) });
      index += 2;
    } else if (afterWide === 1) {
      rows.push({ type: "wide", photos: photos.slice(index, index + 1) });
      index += 1;
    }
  }

  return rows;
}

export function ProjectMosaic({ photos }: { photos: ProjectPhoto[] }) {
  const [expanded, setExpanded] = useState(false);

  if (photos.length === 0) return null;

  const hasMore = photos.length > INITIAL_PHOTOS;
  const visible = expanded || !hasMore ? photos : photos.slice(0, INITIAL_PHOTOS);
  const remaining = photos.length - visible.length;
  const rows = scrapbookRows(visible);

  return (
    <div className="project-mosaic">
      {rows.map((row, rowIndex) => (
        <div key={`${row.type}-${rowIndex}`} className={`project-mosaic__row project-mosaic__row--${row.type}`}>
          {row.photos.map((photo, photoIndex) => (
            <figure key={`${photo.src}-${photoIndex}`} className="project-mosaic__item">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  row.type === "wide"
                    ? "(min-width: 78rem) 78rem, 100vw"
                    : row.type === "pair"
                      ? "(min-width: 640px) 50vw, 100vw"
                      : "(min-width: 640px) 33vw, 100vw"
                }
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      ))}
      {hasMore && !expanded ? (
        <div className="project-mosaic__more">
          <button type="button" className="btn-secondary cursor-pointer" onClick={() => setExpanded(true)}>
            Load {remaining} more {remaining === 1 ? "photo" : "photos"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
