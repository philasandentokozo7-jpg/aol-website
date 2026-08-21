import { Button } from "../ui/Button";
import { TrustBadge } from "../ui/TrustBadge";
import { BookButton } from "../interactive/BookButton";
import { HeroVideo } from "../interactive/HeroVideo";
import { Reveal } from "../interactive/Reveal";
import { BRAND } from "@/config/site";

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-heading">
      <div className="container hero__grid">
        <Reveal className="hero__copy" immediate>
          <p className="hero__brand">{BRAND.name}</p>
          <h1 id="hero-heading" className="hero__title">
            Accountants in Durban for Tax, Bookkeeping &amp; Business Advisory
          </h1>
          <p className="hero__tagline">Professional Accounting. Strategic Business Advice. Sustainable Growth.</p>
          <div className="hero__cta">
            <BookButton size="lg" iconRight="arrow-right">
              Book a Free Consultation
            </BookButton>
            <Button size="lg" variant="outline" href="#services">
              Explore Our Services
            </Button>
          </div>
          <div className="hero__leads">
            <p>
              AOL Accounting Academy SA is a modern accounting and business advisory firm that collaborates with a
              network of qualified accountants, tax professionals, payroll specialists, financial consultants, and Xero
              Certified Advisors dedicated to helping businesses achieve sustainable financial success.
            </p>
            <p>
              The name &quot;Academy&quot; reflects our long-term vision of empowering businesses through professional
              knowledge, practical financial guidance, and continuous learning. While our core focus is delivering
              high-quality accounting, taxation, payroll, and business advisory services, we are committed to expanding
              our contribution to business development through education, professional training, and financial
              empowerment initiatives in the future.
            </p>
            <p>
              Built on collaboration, innovation, and integrity, our network combines academic excellence with practical
              industry experience to deliver reliable, tailored, and results-driven financial solutions that help
              businesses remain compliant, make informed decisions, and grow with confidence.
            </p>
          </div>
          <ul className="hero__trust" aria-label="Trust signals">
            <li>
              <TrustBadge icon="graduation-cap">Qualified Financial Professionals</TrustBadge>
            </li>
            <li>
              <TrustBadge icon="briefcase">Business Advisory Services</TrustBadge>
            </li>
            <li>
              <TrustBadge icon="cloud">Cloud Accounting Solutions</TrustBadge>
            </li>
            <li>
              <TrustBadge icon="badge-check" tone="gold">
                Xero Certified Advisors
              </TrustBadge>
            </li>
          </ul>
        </Reveal>

        <Reveal className="hero__visual" delay="1" immediate>
          <div className="hero__frame">
            <HeroVideo />
            <span className="hero__ring" aria-hidden="true"></span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
