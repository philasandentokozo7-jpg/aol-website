import { Icon, type IconName } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../interactive/Reveal";

const ABOUT_POINTS: Array<[IconName, string, string]> = [
  ["shield-check", "Compliance-first", "SARS & CIPC obligations kept current, every deadline."],
  ["cloud", "Cloud accounting", "Xero-certified — real-time books on any device."],
  ["users", "Collaborative network", "Specialists across tax, payroll & advisory."],
  ["compass", "Advisory mindset", "We turn your numbers into clear decisions."],
];

export function About() {
  return (
    <section id="about" className="section section--white">
      <div className="container about__grid">
        <Reveal>
          <div className="about__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/media/aol-office.webp"
              alt="An AOL accountant at work — bookkeeping, tax and advisory in the office"
              loading="lazy"
            />
            <div className="about__badge">
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: ".55rem",
                  background: "rgba(10,30,58,.82)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,.16)",
                  borderRadius: "999px",
                  padding: ".5rem .9rem",
                  fontWeight: 600,
                  fontSize: "var(--text-sm)",
                }}
              >
                <Icon name="badge-check" size={16} color="var(--gold-400)" />
                Qualified SA professionals
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay="1">
          <SectionHeading eyebrow="About AOL" title={"More Than Accounting.<br>A Trusted <em>Business Partner.</em>"} />
          <div className="prose" style={{ marginTop: "1.35rem" }}>
            <p>
              At AOL Accounting Academy SA, we believe accounting should do more than satisfy compliance requirements —
              it should provide the financial insight businesses need to make informed decisions and achieve sustainable
              growth.
            </p>
            <p>
              Our collaborative network of professionals combines academic excellence, practical industry experience and
              modern cloud accounting technology to deliver accurate information, strategic guidance and personalised
              support tailored to every client&apos;s goals. We build long-term relationships founded on professionalism,
              integrity and measurable value.
            </p>
          </div>
          <div className="about__points">
            {ABOUT_POINTS.map(([icon, title, desc]) => (
              <div className="about__point" key={title}>
                <span className="ic">
                  <Icon name={icon} size={20} />
                </span>
                <div>
                  <b>{title}</b>
                  <span>{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
