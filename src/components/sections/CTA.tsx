import { Button } from "../ui/Button";
import { BookButton } from "../interactive/BookButton";
import { Reveal } from "../interactive/Reveal";

export function CTA() {
  return (
    <section className="section section--white">
      <div className="container">
        <Reveal className="ctaband">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ctaband__mark" src="/assets/logo/aol-mark.webp" alt="" aria-hidden="true" loading="lazy" />
          <div className="ctaband__inner">
            <h2 className="ctaband__title">Ready to Strengthen Your Business Finances?</h2>
            <p className="ctaband__lead">
              Book a free, no-obligation consultation and get a clear view of where your business stands — and where AOL
              can take it.
            </p>
            <div className="ctaband__cta">
              <BookButton size="lg" iconRight="arrow-right">
                Book a Free Consultation
              </BookButton>
              <Button size="lg" variant="outline" onDark href="#contact">
                Contact Our Team
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
