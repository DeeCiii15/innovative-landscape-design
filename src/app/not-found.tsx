import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-main py-24 sm:py-32">
      <h1 className="heading-section">Page not found</h1>
      <p className="lead mt-5 max-w-xl">That address is not on this site. It may be an old WordPress link.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <Link href="/contact" className="btn-secondary">
          Contact
        </Link>
      </div>
    </div>
  );
}
