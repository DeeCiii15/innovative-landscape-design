import type { ReactNode } from "react";

export function InnerPage({
  hero,
  children,
  className = "",
}: {
  hero: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={["inner-page", className].filter(Boolean).join(" ")}>
      {hero}
      <div className="inner-page__stack">{children}</div>
    </div>
  );
}
