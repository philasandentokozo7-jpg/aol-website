import { ArticleCard } from "../ui/ArticleCard";
import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../interactive/Reveal";

// TODO: wire these cards + "View all articles" to real articles when the client starts publishing.
const ARTICLES: Array<[string, string, string, string, string]> = [
  ["Cash Flow", "Understanding Cash Flow Management", "Jun 2026", "5 min", "insight-cashflow.webp"],
  ["Tax", "Preparing for Tax Season", "May 2026", "6 min", "insight-tax.webp"],
  ["Cloud", "Benefits of Cloud Accounting with Xero", "May 2026", "4 min", "insight-cloud.webp"],
  ["Advisory", "Financial Tips for Growing Businesses", "Apr 2026", "5 min", "insight-growth.webp"],
];

export function Insights() {
  return (
    <section id="insights" className="section section--paper2">
      <div className="container">
        <Reveal
          className="section__head"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap" }}
        >
          <SectionHeading eyebrow="Insights" title="Guidance to help you <em>run a sharper business</em>" />
          <Button variant="ghost" iconRight="arrow-right" href="#insights">
            View all articles
          </Button>
        </Reveal>
        <div className="grid grid--4">
          {ARTICLES.map(([category, title, date, readTime, image], i) => (
            <Reveal key={title} delay={String(i + 1)}>
              <ArticleCard
                category={category}
                title={title}
                date={date}
                readTime={readTime}
                image={`/assets/media/${image}`}
                alt={title}
                href="#insights"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
