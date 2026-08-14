import Link from "next/link";
import { Icon } from "../ui/Icon";
import {
  BRAND,
  BUSINESS_HOURS,
  COMPANY_REGISTRATION_NUMBER,
  CONTACT_EMAIL,
  isPublicValue,
  MAILTO_INFO,
  MAILTO_OFFICE,
  OFFICE_EMAIL,
  PHONE_DISPLAY,
  PHONE_HREF,
  PHYSICAL_ADDRESS,
  publicSocialLinks,
  TRADING_NAME,
  WHATSAPP_URL,
} from "@/config/site";

const F_QUICK: Array<[string, string]> = [
  ["Home", "/#home"],
  ["About", "/#about"],
  ["Services", "/services"],
  ["Industries", "/#industries"],
  ["Insights", "/#insights"],
  ["Contact", "/#contact"],
];

const F_SERVICES: Array<[string, string]> = [
  ["Accounting & Bookkeeping", "/services"],
  ["Payroll Administration", "/services"],
  ["Taxation Services", "/services"],
  ["Business Advisory", "/services"],
  ["Cloud Accounting (Xero)", "/services"],
  ["CIPC Services", "/services"],
];

export function Footer() {
  const social = publicSocialLinks();
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="ftr">
      <div className="container">
        <div className="ftr__grid">
          <div className="ftr__brand">
            <Link className="chip" href="/#home" aria-label={`${TRADING_NAME} — home`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={BRAND.logoFull} alt={TRADING_NAME} width={57} height={40} loading="lazy" />
            </Link>
            <p>
              AOL Accounting Academy SA is a modern accounting and business advisory firm that collaborates with a
              network of qualified accountants, tax professionals, payroll specialists, financial consultants, and Xero
              Certified Advisors dedicated to helping businesses achieve sustainable financial success.
            </p>
            {isPublicValue(COMPANY_REGISTRATION_NUMBER) ? (
              <p className="ftr__reg">Company registration number: {COMPANY_REGISTRATION_NUMBER}</p>
            ) : null}
            {social.length > 0 ? (
              <div className="ftr__social">
                {social.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    {s.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <nav className="ftr__col" aria-label="Footer quick links">
            <h3>Quick Links</h3>
            <ul>
              {F_QUICK.map(([label, href]) => (
                <li key={label}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="ftr__col" aria-label="Footer services">
            <h3>Services</h3>
            <ul>
              {F_SERVICES.map(([label, href]) => (
                <li key={label}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ftr__col">
            <h3>Contact</h3>
            <ul className="ftr__contact">
              {isPublicValue(PHYSICAL_ADDRESS) ? (
                <li>
                  <Icon name="map-pin" size={17} />
                  <span>{PHYSICAL_ADDRESS}</span>
                </li>
              ) : null}
              {isPublicValue(PHONE_DISPLAY) ? (
                <li>
                  <Icon name="phone" size={17} />
                  <span>
                    <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                  </span>
                </li>
              ) : null}
              {isPublicValue(CONTACT_EMAIL) ? (
                <li>
                  <Icon name="mail" size={17} />
                  <span>
                    Enquiries: <a href={MAILTO_INFO}>{CONTACT_EMAIL}</a>
                  </span>
                </li>
              ) : null}
              {isPublicValue(OFFICE_EMAIL) ? (
                <li>
                  <Icon name="mail" size={17} />
                  <span>
                    Office: <a href={MAILTO_OFFICE}>{OFFICE_EMAIL}</a>
                  </span>
                </li>
              ) : null}
              {isPublicValue(WHATSAPP_URL) ? (
                <li>
                  <Icon name="message-circle" size={17} />
                  <span>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      WhatsApp chat
                    </a>
                  </span>
                </li>
              ) : null}
              {isPublicValue(BUSINESS_HOURS) ? (
                <li>
                  <Icon name="clock" size={17} />
                  <span>{BUSINESS_HOURS}</span>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="ftr__bottom">
          <span>
            © {year} {TRADING_NAME}. All rights reserved.
          </span>
          <span className="links">
            <Link href="/privacy">Privacy Notice</Link>
            <Link href="/cookies">Cookie Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
