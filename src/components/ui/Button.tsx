import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "navy" | "outline" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  iconLeft?: IconName;
  iconRight?: IconName;
  href?: string;
  onDark?: boolean;
  block?: boolean;
  disabled?: boolean;
  className?: string;
};

export type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps>;

/** Button — primary call to action across the AOL system. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  href,
  onDark = false,
  block = false,
  disabled = false,
  type = "button",
  className = "",
  ...rest
}: ButtonProps) {
  const cls = [
    "aol-btn",
    `aol-btn--${variant}`,
    `aol-btn--${size}`,
    onDark ? "aol-btn--onDark" : "",
    block ? "aol-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconSize = size === "sm" ? 16 : size === "lg" ? 20 : 18;
  const inner = (
    <>
      {iconLeft && <Icon className="aol-btn__ico" name={iconLeft} size={iconSize} stroke={2} />}
      {children && <span>{children}</span>}
      {iconRight && <Icon className="aol-btn__ico" name={iconRight} size={iconSize} stroke={2} />}
    </>
  );

  if (href && !disabled) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link className={cls} href={href} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {inner}
        </Link>
      );
    }
    return (
      <a className={cls} href={href} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    );
  }
  return (
    <button
      className={cls}
      type={type as ButtonHTMLAttributes<HTMLButtonElement>["type"]}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {inner}
    </button>
  );
}
