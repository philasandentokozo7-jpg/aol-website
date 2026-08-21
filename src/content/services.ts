import type { IconName } from "@/components/ui/Icon";

export type ServiceItem = {
  icon: IconName;
  title: string;
  /** Locked owner description. */
  description: string;
  /** Public URL segment under /services/ */
  slug: string;
  /** Short meta description for the dedicated landing page. */
  metaDescription: string;
  /** Extra “how we can help” bullets derived from the locked description (no new claims). */
  helpPoints: string[];
  relatedSlugs: string[];
};

/**
 * Ten service names and descriptions are locked from owner-approved source content.
 * Public URL slugs follow the SEO architecture plan.
 */
export const SERVICES: ServiceItem[] = [
  {
    icon: "calculator",
    title: "Accounting & Bookkeeping",
    slug: "bookkeeping",
    description:
      "Clear and current financial records are essential for compliance and informed decision-making. We provide accounting and bookkeeping support that includes systematic transaction recording, reconciliations, and organised financial information using modern cloud-based systems. Whether you are a startup, a growing enterprise, or an established organisation, our tailored bookkeeping solutions are designed to improve financial control, strengthen reporting accuracy and support confident business decisions.",
    metaDescription:
      "Bookkeeping and accounting support for Durban and South African SMEs — transaction recording, reconciliations and organised financial information.",
    helpPoints: [
      "Systematic transaction recording",
      "Bank and account reconciliations",
      "Organised financial information on modern cloud-based systems",
      "Improved financial control and reporting accuracy",
    ],
    relatedSlugs: ["payroll", "financial-statements", "xero-accounting"],
  },
  {
    icon: "receipt",
    title: "Payroll Administration",
    slug: "payroll",
    description:
      "Payroll must be accurate, confidential, and submitted on time. We assist businesses with payroll processing, payslip preparation, and the handling of PAYE, UIF and SDL calculations, submissions and records so employees are paid correctly while statutory obligations remain up to date.",
    metaDescription:
      "Payroll administration for South African businesses — payslips, PAYE, UIF and SDL calculations, submissions and records.",
    helpPoints: [
      "Payroll processing and payslip preparation",
      "PAYE, UIF and SDL calculations",
      "Statutory submissions and payroll records",
      "Confidential handling of employee pay information",
    ],
    relatedSlugs: ["bookkeeping", "tax-services", "cipc-services"],
  },
  {
    icon: "landmark",
    title: "Taxation Services",
    slug: "tax-services",
    description:
      "Managing taxation obligations requires professional knowledge and careful planning. We assist businesses with tax registrations, tax compliance, tax planning, and ongoing advisory services to help minimise risks while ensuring compliance with South African tax legislation.",
    metaDescription:
      "Tax registrations, compliance support and tax planning for Durban and South African businesses.",
    helpPoints: [
      "Tax registrations",
      "Tax compliance support",
      "Tax planning guidance",
      "Ongoing advisory aligned to South African tax legislation",
    ],
    relatedSlugs: ["bookkeeping", "financial-statements", "business-advisory"],
  },
  {
    icon: "file-text",
    title: "Financial Statements",
    slug: "financial-statements",
    description:
      "Reliable financial statements provide valuable insight into business performance and financial position. We prepare professional financial statements that support statutory compliance, management decision-making, financing applications, and stakeholder reporting.",
    metaDescription:
      "Professional financial statements for statutory compliance, management decisions, financing applications and stakeholder reporting.",
    helpPoints: [
      "Preparation of professional financial statements",
      "Support for statutory compliance",
      "Insight for management decision-making",
      "Reporting suited to financing and stakeholder needs",
    ],
    relatedSlugs: ["bookkeeping", "management-accounting", "tax-services"],
  },
  {
    icon: "bar-chart-3",
    title: "Management Accounting",
    slug: "management-accounting",
    description:
      "Financial information should support business decisions, not simply satisfy reporting requirements. Our management accounting services provide budgeting, forecasting, performance analysis, profitability reporting, cost management, and financial planning that assist business owners in making informed strategic decisions.",
    metaDescription:
      "Management accounting for SMEs — budgeting, forecasting, performance analysis and financial planning.",
    helpPoints: [
      "Budgeting and forecasting",
      "Performance and profitability analysis",
      "Cost management insight",
      "Financial planning for strategic decisions",
    ],
    relatedSlugs: ["cash-flow-management", "business-advisory", "financial-statements"],
  },
  {
    icon: "lightbulb",
    title: "Business Advisory",
    slug: "business-advisory",
    description:
      "Every business experiences challenges and opportunities throughout its lifecycle. Our advisory services provide practical guidance that supports improved decision-making, operational efficiency, financial sustainability, risk management, and long-term business growth.",
    metaDescription:
      "Practical business advisory for decision-making, efficiency, financial sustainability and growth.",
    helpPoints: [
      "Practical guidance for business decisions",
      "Support for operational efficiency",
      "Focus on financial sustainability",
      "Risk-aware planning for long-term growth",
    ],
    relatedSlugs: ["management-accounting", "cash-flow-management", "accounting-training"],
  },
  {
    icon: "building-2",
    title: "CIPC Services",
    slug: "cipc-services",
    description:
      "We assist businesses with company registrations, amendments, annual returns, director changes, compliance requirements, and other corporate secretarial services to ensure businesses remain compliant throughout their lifecycle.",
    metaDescription:
      "CIPC and corporate secretarial support — company registrations, amendments, annual returns and director changes.",
    helpPoints: [
      "Company registrations",
      "Amendments and director changes",
      "Annual returns",
      "Ongoing corporate compliance support",
    ],
    relatedSlugs: ["tax-services", "bookkeeping", "business-advisory"],
  },
  {
    icon: "cloud",
    title: "Cloud Accounting (Xero)",
    slug: "xero-accounting",
    description:
      "Cloud accounting transforms the way businesses manage their finances. As Xero Certified Advisors, we assist businesses with implementation, conversion, training, support, and ongoing optimisation, allowing clients to access secure financial information anytime and from anywhere.",
    metaDescription:
      "Xero cloud accounting implementation, conversion, training and ongoing support from AOL Accounting Academy SA.",
    helpPoints: [
      "Xero implementation and conversion",
      "User training and ongoing support",
      "Optimisation of cloud accounting workflows",
      "Secure access to financial information anytime",
    ],
    relatedSlugs: ["bookkeeping", "accounting-training", "cash-flow-management"],
  },
  {
    icon: "banknote",
    title: "Cash Flow Management",
    slug: "cash-flow-management",
    description:
      "Cash flow remains one of the most important factors affecting business success. We assist businesses in monitoring cash inflows and outflows, improving liquidity, managing working capital, and developing strategies that strengthen financial stability.",
    metaDescription:
      "Cash flow monitoring, liquidity and working-capital support for growing South African businesses.",
    helpPoints: [
      "Monitoring cash inflows and outflows",
      "Improving liquidity visibility",
      "Working-capital management support",
      "Strategies that strengthen financial stability",
    ],
    relatedSlugs: ["management-accounting", "business-advisory", "bookkeeping"],
  },
  {
    icon: "graduation-cap",
    title: "Accounting Training",
    slug: "accounting-training",
    description:
      "We believe knowledge empowers better financial decision-making. Our accounting training services are designed to help business owners, finance staff, students, and entrepreneurs develop practical accounting knowledge that improves financial management and business performance.",
    metaDescription:
      "Practical accounting training for business owners, finance staff, students and entrepreneurs.",
    helpPoints: [
      "Practical accounting knowledge for owners and teams",
      "Training suited to finance staff and entrepreneurs",
      "Focus on everyday financial management skills",
      "Support that strengthens business performance",
    ],
    relatedSlugs: ["xero-accounting", "bookkeeping", "business-advisory"],
  },
];

export const SERVICES_SECTION_HEADING = "Comprehensive Financial Solutions Under One Roof";
export const SERVICES_SECTION_INTRO =
  "Whether you're starting a business, managing day-to-day finances, or planning for future growth, we provide integrated financial services designed to support every stage of your business journey.";
export const SERVICES_VIEW_ALL_LABEL = "View All Services.";

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function servicePath(slug: string): string {
  return `/services/${slug}/`;
}

export function relatedServices(slug: string): ServiceItem[] {
  const current = getServiceBySlug(slug);
  if (!current) return [];
  return current.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is ServiceItem => Boolean(s));
}
