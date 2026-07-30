import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../interactive/Reveal";

/** Approved topic titles only — no fabricated articles, dates, authors, or click-throughs. */
const TOPICS = [
  "Understanding Cash Flow Management",
  "Preparing for Tax Season",
  "Benefits of Cloud Accounting with Xero",
  "Financial Tips for Growing Businesses",
] as const;

export function Insights() {
  return (
    <section id="insights" className="section section--paper2" aria-labelledby="insights-heading" tabIndex={-1}>
      <div className="container">
        <Reveal className="section__head section__head--center">
          <SectionHeading
            id="insights-heading"
            align="center"
            eyebrow="Insights"
            title="Insights That Help Your Business Grow"
          />
        </Reveal>
        <ul className="insights-preview">
          {TOPICS.map((title, i) => (
            <li key={title} className="insights-preview__item">
              <Reveal delay={String(i + 1)}>
                <div className="insights-preview__row">
                  <span className="insights-preview__mark" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="insights-preview__title">{title}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
