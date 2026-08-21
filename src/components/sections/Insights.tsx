import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../interactive/Reveal";
import { Button } from "../ui/Button";
import { INSIGHT_TOPICS } from "@/content/insights";

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
          {INSIGHT_TOPICS.map((topic, i) => (
            <li key={topic.title} className="insights-preview__item">
              <Reveal delay={String(i + 1)}>
                <div className="insights-preview__row">
                  <span className="insights-preview__mark" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="insights-preview__title">{topic.title}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="services__more">
          <Button href="/insights/" size="lg" variant="outline" iconRight="arrow-right">
            View insights hub
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
