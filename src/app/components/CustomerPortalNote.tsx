import { LOGIN_PATH } from "@/lib/siteConstants";

export function CustomerPortalNote({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={`portal-note${compact ? " portal-note--compact" : ""}`}
      aria-labelledby="portal-note-heading"
    >
      <div className="container-main portal-note__inner">
        <div className="portal-note__copy">
          <h2 id="portal-note-heading" className="portal-note__heading">
            {compact ? "Customer portal" : "Track progress and billing in your own customized portal"}
          </h2>
          <p className="portal-note__body">
            It&apos;s not just for maintenance — it&apos;s also for installation. Our customers
            are able to log in to view jobs, invoices, payments, and set up auto pay in their own
            personalized portal.
          </p>
        </div>
        <a href={LOGIN_PATH} className="btn-primary portal-note__btn" rel="noopener noreferrer">
          Customer portal login
        </a>
      </div>
    </section>
  );
}

