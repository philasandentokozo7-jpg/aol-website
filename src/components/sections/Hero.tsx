import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Icon } from "../ui/Icon";
import { TrustBadge } from "../ui/TrustBadge";
import { BookButton } from "../interactive/BookButton";
import { HeroVideo } from "../interactive/HeroVideo";
import { Reveal } from "../interactive/Reveal";

export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <Reveal className="hero__copy">
          <Eyebrow>Trusted &middot; Transparent &middot; Professional</Eyebrow>
          <h1 className="hero__title">
            Professional Accounting. Strategic Business Advice. <em>Sustainable Growth.</em>
          </h1>
          <p className="hero__lead">
            AOL Accounting Academy SA is a modern accounting and business advisory firm — a collaborative network of
            qualified accountants, tax professionals, payroll specialists and Xero Certified Advisors. True to the name
            &ldquo;Academy&rdquo;, we pair academic excellence with practical experience to help businesses stay
            compliant, make informed decisions, and grow with confidence.
          </p>
          <div className="hero__cta">
            <BookButton size="lg" iconRight="arrow-right">
              Book a Free Consultation
            </BookButton>
            <Button size="lg" variant="outline" href="#services">
              Explore Our Services
            </Button>
          </div>
          <div className="hero__trust">
            <TrustBadge icon="graduation-cap">Qualified Financial Professionals</TrustBadge>
            <TrustBadge icon="briefcase">Business Advisory Services</TrustBadge>
            <TrustBadge icon="cloud">Cloud Accounting Solutions</TrustBadge>
            <TrustBadge icon="badge-check" tone="gold">
              Xero Certified Advisors
            </TrustBadge>
          </div>
        </Reveal>

        <Reveal className="hero__visual" delay="1">
          <div className="hero__frame">
            <HeroVideo />
            <span className="hero__ring" aria-hidden="true"></span>
          </div>
          <div className="hero__chip">
            <span className="ic">
              <Icon name="trending-up" size={20} />
            </span>
            <span className="tx">
              <b>Cloud-first accounting</b>
              <span>Real-time numbers, any device</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
