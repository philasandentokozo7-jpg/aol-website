import { Button } from "../ui/Button";
import { BookButton } from "../interactive/BookButton";
import { Reveal } from "../interactive/Reveal";
import { BRAND } from "@/config/site";

export function CTA() {
  return (
    <section className="section section--white" aria-labelledby="cta-heading">
      <div className="container">
        <Reveal className="ctaband">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ctaband__mark" src={BRAND.logoMark} alt="" aria-hidden="true" loading="lazy" width={260} height={260} />
          <div className="ctaband__inner">
            <h2 id="cta-heading" className="ctaband__title">
              Ready to Strengthen Your Business Finances?
            </h2>
            <p className="ctaband__lead">
              Partner with AOL Accounting Academy SA and gain access to professional accounting, taxation, payroll, and
              business advisory services designed to help your business grow with confidence.
            </p>
            <div className="ctaband__cta">
              <BookButton size="lg" iconRight="arrow-right">
                Book a Free Consultation
              </BookButton>
              <Button size="lg" variant="outline" onDark href="/contact/">
                Contact Our Team
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
