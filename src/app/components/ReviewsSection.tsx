import { Reveal } from "./Reveal";
import { siteConfig } from "@/lib/siteConfig";

function Stars({ count }: { count: number }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          className="size-3.5"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export function ReviewsSection() {
  return (
    <section className="reviews section--tight">
      <div className="container-main">
        <Reveal className="reviews__head">
          <h2 className="heading-section reviews__title">What our customers say</h2>
        </Reveal>

        <div className="reviews__grid">
          {siteConfig.reviews.map((review, index) => (
            <Reveal key={review.id} delay={index * 60}>
              <figure className="review">
                <Stars count={review.rating} />
                <blockquote className="review__text">&ldquo;{review.text}&rdquo;</blockquote>
                <figcaption className="review__cite">
                  <p className="review__name">{review.name}</p>
                  <p className="review__meta">
                    {review.location} · {review.service}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
