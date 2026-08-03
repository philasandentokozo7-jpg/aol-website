import type { IconName } from "@/components/ui/Icon";

export type ServiceItem = {
  icon: IconName;
  title: string;
  /** Locked owner description, or null when title-only until client supplies copy. */
  description: string | null;
  slug: string;
};

/**
 * Ten service names are locked.
 * Eight original owner descriptions remain locked.
 * Accounting & Bookkeeping ends with the owner-supplied closing sentence.
 * Payroll Administration uses the established payroll scope already present
 * in the project (PAYE, UIF, SDL, payslips, submissions and records).
 */
export const SERVICES: ServiceItem[] = [
  {
    icon: "calculator",
    title: "Accounting & Bookkeeping",
    description:
      "Clear and current financial records are essential for compliance and informed decision-making. We provide accounting and bookkeeping support that includes systematic transaction recording, reconciliations, and organised financial information using modern cloud-based systems. Whether you are a startup, a growing enterprise, or an established organisation, our tailored bookkeeping solutions are designed to improve financial control, strengthen reporting accuracy and support confident business decisions.",
    slug: "accounting-bookkeeping",
  },
  {
    icon: "receipt",
    title: "Payroll Administration",
    description:
      "Payroll must be accurate, confidential, and submitted on time. We assist businesses with payroll processing, payslip preparation, and the handling of PAYE, UIF and SDL calculations, submissions and records so employees are paid correctly while statutory obligations remain up to date.",
    slug: "payroll-administration",
  },
  {
    icon: "landmark",
    title: "Taxation Services",
    description:
      "Managing taxation obligations requires professional knowledge and careful planning. We assist businesses with tax registrations, tax compliance, tax planning, and ongoing advisory services to help minimise risks while ensuring compliance with South African tax legislation.",
    slug: "taxation-services",
  },
  {
    icon: "file-text",
    title: "Financial Statements",
    description:
      "Reliable financial statements provide valuable insight into business performance and financial position. We prepare professional financial statements that support statutory compliance, management decision-making, financing applications, and stakeholder reporting.",
    slug: "financial-statements",
  },
  {
    icon: "bar-chart-3",
    title: "Management Accounting",
    description:
      "Financial information should support business decisions, not simply satisfy reporting requirements. Our management accounting services provide budgeting, forecasting, performance analysis, profitability reporting, cost management, and financial planning that assist business owners in making informed strategic decisions.",
    slug: "management-accounting",
  },
  {
    icon: "lightbulb",
    title: "Business Advisory",
    description:
      "Every business experiences challenges and opportunities throughout its lifecycle. Our advisory services provide practical guidance that supports improved decision-making, operational efficiency, financial sustainability, risk management, and long-term business growth.",
    slug: "business-advisory",
  },
  {
    icon: "building-2",
    title: "CIPC Services",
    description:
      "We assist businesses with company registrations, amendments, annual returns, director changes, compliance requirements, and other corporate secretarial services to ensure businesses remain compliant throughout their lifecycle.",
    slug: "cipc-services",
  },
  {
    icon: "cloud",
    title: "Cloud Accounting (Xero)",
    description:
      "Cloud accounting transforms the way businesses manage their finances. As Xero Certified Advisors, we assist businesses with implementation, conversion, training, support, and ongoing optimisation, allowing clients to access secure financial information anytime and from anywhere.",
    slug: "cloud-accounting-xero",
  },
  {
    icon: "banknote",
    title: "Cash Flow Management",
    description:
      "Cash flow remains one of the most important factors affecting business success. We assist businesses in monitoring cash inflows and outflows, improving liquidity, managing working capital, and developing strategies that strengthen financial stability.",
    slug: "cash-flow-management",
  },
  {
    icon: "graduation-cap",
    title: "Accounting Training",
    description:
      "We believe knowledge empowers better financial decision-making. Our accounting training services are designed to help business owners, finance staff, students, and entrepreneurs develop practical accounting knowledge that improves financial management and business performance.",
    slug: "accounting-training",
  },
];

export const SERVICES_SECTION_HEADING = "Comprehensive Financial Solutions Under One Roof";
export const SERVICES_SECTION_INTRO =
  "Whether you're starting a business, managing day-to-day finances, or planning for future growth, we provide integrated financial services designed to support every stage of your business journey.";
export const SERVICES_VIEW_ALL_LABEL = "View All Services.";
