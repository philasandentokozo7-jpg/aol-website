import type { IconName } from "@/components/ui/Icon";

export type IndustryItem = {
  icon: IconName;
  label: string;
};

/** Owner-approved industry list — hub page only; no thin doorway pages. */
export const INDUSTRIES: IndustryItem[] = [
  { icon: "building-2", label: "Small & Medium Enterprises (SMEs)" },
  { icon: "rocket", label: "Start-ups" },
  { icon: "store", label: "Retail & Wholesale" },
  { icon: "hard-hat", label: "Construction" },
  { icon: "bus", label: "Transport & Taxi Industry" },
  { icon: "utensils", label: "Hospitality" },
  { icon: "briefcase", label: "Professional Services" },
  { icon: "school", label: "Educational Institutions" },
  { icon: "heart-handshake", label: "Non-Profit Organisations" },
];

export const INDUSTRIES_HEADING = "Supporting Businesses Across Diverse Industries";
export const INDUSTRIES_INTRO =
  "We proudly provide professional accounting and advisory services to organisations operating in a wide range of industries.";
