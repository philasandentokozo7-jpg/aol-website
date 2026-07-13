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

// Real business details (AOL Accounting Academy SA).
// Email intentionally omitted until Google Workspace is set up on the domain.
const CONTACT = {
  address: "27 Bram Fischer Road, Storage Solutions, 2nd Floor, Room 2-40, Durban",
  phoneDisplay: "+27 72 206 7130",
  phoneHref: "tel:+27722067130",
  whatsappHref: "https://wa.me/27722067130",
  hours: "Mon–Fri: 08:00–16:30",
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
                <span>{CONTACT.address}</span>
              </li>
              <li>
                <Icon name="phone" size={17} />
                <span>
                  <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
                </span>
              </li>
              <li>
                <Icon name="message-circle" size={17} />
                <span>
                  <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
                    WhatsApp chat
                  </a>
                </span>
              </li>
              <li>
                <Icon name="clock" size={17} />
                <span>{CONTACT.hours}</span>
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
