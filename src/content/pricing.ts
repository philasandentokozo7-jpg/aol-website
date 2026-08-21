import type { IconName } from "@/components/ui/Icon";

export type PricingPlan = {
  tier: string;
  price: string;
  icon: IconName;
  description: string;
  features: string[];
  featured?: boolean;
  badge?: string;
};

/** Owner-approved package pricing — do not invent discounts or new inclusions. */
export const PRICING_PLANS: PricingPlan[] = [
  {
    tier: "Foundation",
    price: "R2,300",
    icon: "layers",
    description:
      "A strong financial foundation — for start-ups, sole proprietors and small businesses with lower transaction volumes.",
    features: [
      "Daily / weekly / monthly bookkeeping",
      "Bank reconciliation (1 account)",
      "Accounts payable & receivable",
      "General ledger & trial balance",
      "Cloud bookkeeping on Xero",
      "Monthly financial summary",
      "Email & WhatsApp support",
    ],
  },
  {
    tier: "Growth",
    price: "R4,500",
    icon: "trending-up",
    featured: true,
    badge: "Most Popular",
    description: "Deeper insight and stronger control for expanding SMEs (≈100–500 monthly transactions).",
    features: [
      "Everything in Foundation",
      "Multiple bank reconciliations",
      "Inventory & fixed-asset register",
      "AR / AP ageing reports",
      "Monthly management reports",
      "Month-end review meeting",
      "Priority client support",
    ],
  },
  {
    tier: "Professional",
    price: "R7,500",
    icon: "briefcase",
    description: "Comprehensive management for established businesses (≈500–1,500 monthly transactions).",
    features: [
      "Everything in Growth",
      "Monthly financial analysis",
      "Budget monitoring & cash-flow reporting",
      "Management accounting & KPI reporting",
      "Quarterly review meetings",
      "Dedicated account manager",
      "Business performance recommendations",
    ],
  },
];

export const PRICING_ADDONS = [
  "Payroll Administration",
  "VAT Registration & Returns",
  "Income Tax Services",
  "Annual Financial Statements",
  "Independent Reviews",
  "CIPC Services",
  "Xero Setup & Migration",
  "Xero Training",
  "Business Advisory",
  "Cash-Flow Forecasting",
  "Accounting Training",
] as const;

export const PRICING_ONCE_OFF_NOTE = "Once-off professional services from R450";
export const PRICING_FINE_PRINT =
  "Final pricing depends on your business requirements and transaction volume.";
