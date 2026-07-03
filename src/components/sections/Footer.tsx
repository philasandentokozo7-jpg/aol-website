import { Icon } from "../ui/Icon";

const F_QUICK = ["Home", "About", "Services", "Industries", "Pricing", "Insights", "Contact"];
const F_SERVICES = [
  "Accounting & Bookkeeping",
  "Payroll Administration",
  "Taxation Services",
  "Business Advisory",
  "Cloud Accounting / Xero",
  "CIPC Services",
];

// TODO(client): replace every "(placeholder)" value below with the real details,
// then delete the <em>(placeholder)</em> markers.
const CONTACT = {
  address: "Your office address, South Africa",
  phoneDisplay: "+27 (0)00 000 0000",
  phoneHref: "tel:+270000000000",
  whatsappHref: "https://wa.me/270000000000", // TODO(client): real WhatsApp number, digits only
  email: "hello@aolacademy.co.za",
  hours: "Mon–Fri: 08:00–17:00",
};

export function Footer() {
  return (
    <footer id="contact" className="ftr">
      <div className="container">
        <div className="ftr__grid">
          <div className="ftr__brand">
            <span className="chip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/logo/aol-logo-full.webp" alt="AOL Accounting Academy SA" width={57} height={40} loading="lazy" />
            </span>
            <p>
              Modern accounting and business advisory for South African SMEs, start-ups and growing companies — keeping
              you compliant, informed and ready to grow.
            </p>
            {/* TODO(client): social profiles — restore the icon row once real URLs exist.
                Design reference: .ftr__social with linkedin / facebook / instagram / twitter icons,
                target="_blank" rel="noopener noreferrer". Hidden for launch per handoff guidance. */}
          </div>

          <div className="ftr__col">
            <h3>Quick Links</h3>
            <ul>
              {F_QUICK.map((l) => (
                <li key={l}>
                  <a href={l === "Contact" ? "#contact" : `#${l.toLowerCase()}`}>{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ftr__col">
            <h3>Services</h3>
            <ul>
              {F_SERVICES.map((l) => (
                <li key={l}>
                  <a href="#services">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="ftr__col">
            <h3>Contact</h3>
            <ul className="ftr__contact">
              <li>
                <Icon name="map-pin" size={17} />
                <span>
                  {CONTACT.address} <em style={{ opacity: 0.7 }}>(placeholder)</em>
                </span>
              </li>
              <li>
                <Icon name="phone" size={17} />
                <span>
                  <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a> <em style={{ opacity: 0.7 }}>(placeholder)</em>
                </span>
              </li>
              <li>
                <Icon name="message-circle" size={17} />
                <span>
                  <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
                    WhatsApp chat
                  </a>{" "}
                  <em style={{ opacity: 0.7 }}>(placeholder)</em>
                </span>
              </li>
              <li>
                <Icon name="mail" size={17} />
                <span>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> <em style={{ opacity: 0.7 }}>(placeholder)</em>
                </span>
              </li>
              <li>
                <Icon name="clock" size={17} />
                <span>
                  {CONTACT.hours} <em style={{ opacity: 0.7 }}>(placeholder)</em>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="ftr__bottom">
          <span>© 2026 AOL Accounting Academy SA. All rights reserved.</span>
          {/* TODO(client): add real Privacy Policy and Terms pages, then restore:
              <span className="links"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms</a></span>
              Hidden for launch rather than shipping dead links. */}
        </div>
      </div>
    </footer>
  );
}
