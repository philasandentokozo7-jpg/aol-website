import { Eyebrow } from "../ui/Eyebrow";
import { Reveal } from "../interactive/Reveal";

export function Testimonials() {
  return (
    <section id="testimonials" className="section section--navy">
      <div className="container">
        <Reveal className="testi">
          <Eyebrow tone="onDark" center>
            Testimonials
          </Eyebrow>
          <span className="testi__mark" aria-hidden="true">
            &ldquo;
          </span>
          {/* TODO: replace with a real, client-approved testimonial + name before removing the Placeholder chip. */}
          <p className="testi__quote">
            AOL Accounting Academy SA helped us streamline our financial processes and provided valuable insights that
            improved our decision-making. Their professionalism and responsiveness have made them a trusted partner for
            our business.
          </p>
          <div className="testi__by">
            <b>Client name &amp; business</b>
            <span>A real testimonial will appear here once approved for use.</span>
            <span className="testi__ph">Placeholder</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
