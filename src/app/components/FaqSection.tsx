"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  faqs?: readonly FaqItem[];
  heading?: string;
  lead?: string;
  id?: string;
  className?: string;
};

export function FaqSection({
  faqs = siteConfig.faqs,
  heading = "Common questions",
  lead = "Quick answers about our services, service area, and how we work.",
  id = "faq",
  className = "",
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={id} className={`faq section scroll-mt-24 ${className}`.trim()}>
      <div className="container-main">
        <div className="faq__intro">
          <h2 className="heading-section section-head__title">{heading}</h2>
          {lead && <p className="lead mt-4">{lead}</p>}
        </div>

        <div className="faq__list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className={`faq__item ${isOpen ? "faq__item--open" : ""}`}>
                <button
                  type="button"
                  className="faq__trigger"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="faq__question">{faq.question}</span>
                  <span className="faq__icon" aria-hidden>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div className="faq__answer">
                  <div className="faq__answer-inner">
                    <p className="faq__answer-text">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
