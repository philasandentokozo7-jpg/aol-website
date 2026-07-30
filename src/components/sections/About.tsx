import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../interactive/Reveal";
import { BRAND } from "@/config/site";

export function About() {
  return (
    <section id="about" className="section section--white" aria-labelledby="about-heading">
      <div className="container about__grid">
        <Reveal>
          <div className="about__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BRAND.officeImage}
              alt="Professional accounting workspace supporting AOL Accounting Academy SA advisory work"
              width={960}
              height={720}
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>

        <Reveal delay="1">
          <SectionHeading
            id="about-heading"
            eyebrow="About AOL"
            title="More Than Accounting. A Trusted Business Partner."
          />
          <div className="prose" style={{ marginTop: "1.35rem" }}>
            <p>
              At AOL Accounting Academy SA, we believe accounting should do more than satisfy compliance
              requirements—it should provide the financial insight businesses need to make informed decisions and
              achieve sustainable growth.
            </p>
            <p>
              Our collaborative network of professionals combines academic excellence, practical industry experience,
              and modern cloud accounting technology to deliver accurate financial information, strategic guidance, and
              personalised support tailored to every client&apos;s goals.
            </p>
            <p>We are committed to building long-term relationships founded on professionalism, integrity, and measurable value.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
