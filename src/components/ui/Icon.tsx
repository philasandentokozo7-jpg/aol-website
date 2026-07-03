import type { CSSProperties } from "react";
import {
  ArrowRight, Award, BadgeCheck, Banknote, BarChart3, Briefcase, Building2, Bus,
  Calculator, Calendar, Check, ChevronDown, ChevronRight, Clock, Cloud, Compass,
  Facebook, FileCheck2, FileText, GraduationCap, HardHat, HeartHandshake, Instagram,
  Landmark, Layers, Lightbulb, Linkedin, Mail, MapPin, Menu, MessageCircle,
  MessagesSquare, Phone, Puzzle, Receipt, Rocket, School, Settings, ShieldCheck,
  SlidersHorizontal, Store, Target, TrendingUp, Twitter, User, Users, Utensils, X,
} from "lucide-react";

// Kebab-case Lucide names (as used throughout the design handoff) → components.
const ICONS = {
  "arrow-right": ArrowRight,
  award: Award,
  "badge-check": BadgeCheck,
  banknote: Banknote,
  "bar-chart-3": BarChart3,
  briefcase: Briefcase,
  "building-2": Building2,
  bus: Bus,
  calculator: Calculator,
  calendar: Calendar,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  clock: Clock,
  cloud: Cloud,
  compass: Compass,
  facebook: Facebook,
  "file-check-2": FileCheck2,
  "file-text": FileText,
  "graduation-cap": GraduationCap,
  "hard-hat": HardHat,
  "heart-handshake": HeartHandshake,
  instagram: Instagram,
  landmark: Landmark,
  layers: Layers,
  lightbulb: Lightbulb,
  linkedin: Linkedin,
  mail: Mail,
  "map-pin": MapPin,
  menu: Menu,
  "message-circle": MessageCircle,
  "messages-square": MessagesSquare,
  phone: Phone,
  puzzle: Puzzle,
  receipt: Receipt,
  rocket: Rocket,
  school: School,
  settings: Settings,
  "shield-check": ShieldCheck,
  "sliders-horizontal": SlidersHorizontal,
  store: Store,
  target: Target,
  "trending-up": TrendingUp,
  twitter: Twitter,
  user: User,
  users: Users,
  utensils: Utensils,
  x: X,
} as const;

export type IconName = keyof typeof ICONS;

export interface IconProps {
  name: IconName;
  size?: number | string;
  stroke?: number;
  color?: string;
  className?: string;
  label?: string;
  style?: CSSProperties;
}

/** Icon — thin wrapper over the Lucide icon set (the AOL system icon library). */
export function Icon({ name, size = 20, stroke = 1.75, color, className = "", label, style = {} }: IconProps) {
  const Glyph = ICONS[name];
  return (
    <span
      className={`aol-icon ${className}`.trim()}
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : "true"}
      style={{
        width: typeof size === "number" ? `${size}px` : size,
        height: typeof size === "number" ? `${size}px` : size,
        color,
        ["--aol-icon-stroke" as string]: stroke,
        ...style,
      }}
    >
      <Glyph size={typeof size === "number" ? size : undefined} strokeWidth={stroke} />
    </span>
  );
}
