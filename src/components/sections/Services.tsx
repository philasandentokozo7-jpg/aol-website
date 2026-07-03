import { SectionHeading } from "../ui/SectionHeading";
import { ServiceCard } from "../ui/ServiceCard";
import { Reveal } from "../interactive/Reveal";
import type { IconName } from "../ui/Icon";

const SERVICES: Array<[IconName, string, string]> = [
  ["calculator", "Accounting & Bookkeeping", "Accurate, reconciled books kept current in the cloud — clarity you can act on."],
  ["receipt", "Payroll Administration", "PAYE, UIF and SDL handled — payslips, submissions and records, on time."],
  ["landmark", "Taxation Services", "Income tax, VAT and provisional returns prepared and filed with SARS."],
  ["file-text", "Financial Statements", "Annual financial statements compiled to standard, ready for banks and funders."],
  ["bar-chart-3", "Management Accounting", "Monthly management accounts and insight to steer decisions with confidence."],
  ["lightbulb", "Business Advisory", "Strategic advice on growth, pricing, budgeting and funding readiness."],
  ["building-2", "CIPC Services", "Company registrations, annual returns and CIPC compliance, start to finish."],
  ["cloud", "Cloud Accounting / Xero", "Xero setup, migration and training — a paperless, real-time finance stack."],
  ["banknote", "Cash Flow Management", "Forecasting and monitoring so you always know what's coming, and when."],
  ["graduation-cap", "Accounting Training", "Practical training for owners and teams to understand their own numbers."],
];

export function Services() {
  return (
    <section id="services" className="section section--white">
      <div className="container">
        <Reveal className="section__head section__head--center">
          <SectionHeading
            align="center"
            eyebrow="Our Services"
            title="Comprehensive <em>Financial Solutions</em> Under One Roof"
            lead="Whether you're starting a business, managing day-to-day finances, or planning for future growth, we provide integrated services designed to support every stage of your business journey."
          />
        </Reveal>
        <div className="grid grid--services">
          {SERVICES.map(([icon, title, desc], i) => (
            <Reveal key={title} delay={String((i % 4) + 1)}>
              <ServiceCard icon={icon} title={title} description={desc} href="#contact" linkLabel="Learn more" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
