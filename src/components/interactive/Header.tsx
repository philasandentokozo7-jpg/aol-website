"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { openConsultation } from "./consultation-events";
import { BRAND, TRADING_NAME } from "@/config/site";
import { PRIMARY_NAV } from "@/lib/seo";

export const NAV = PRIMARY_NAV;

function useHomeScrollSpy(enabled: boolean) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return { scrolled: enabled ? scrolled : true };
}

function pathMatches(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname() || "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled } = useHomeScrollSpy(pathname === "/");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const menuId = useId();

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    burgerRef.current?.focus();
  }, []);

  const onBook = useCallback(() => {
    setMenuOpen(false);
    openConsultation();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className={`hdr ${scrolled || pathname !== "/" ? "hdr--scrolled" : ""}`}>
        <div className="container hdr__inner">
          <Link className="hdr__logo" href="/" aria-label={`${TRADING_NAME} — home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BRAND.logoFull} alt={TRADING_NAME} width={60} height={42} fetchPriority="high" />
          </Link>
          <nav className="hdr__nav" aria-label="Primary">
            {NAV.map(([label, href]) => (
              <Link
                key={href}
                className={`navlink ${pathMatches(pathname, href) ? "navlink--active" : ""}`}
                href={href}
                aria-current={pathMatches(pathname, href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="hdr__actions">
            <Button className="hdr__cta" size="sm" iconRight="arrow-right" onClick={onBook}>
              Book a Free Consultation
            </Button>
            <button
              ref={burgerRef}
              className="hdr__burger"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen(true)}
            >
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen} inert={!menuOpen || undefined}>
        <div className="drawer__scrim" onClick={closeMenu}></div>
        <div
          ref={panelRef}
          id={menuId}
          className="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="drawer__top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BRAND.logoFull} alt="" width={54} height={38} />
            <button className="modal__close" style={{ position: "static" }} aria-label="Close menu" onClick={closeMenu}>
              <Icon name="x" size={20} />
            </button>
          </div>
          {NAV.map(([label, href]) => (
            <Link key={href} className="drawer__link" href={href} onClick={closeMenu}>
              {label}
              <Icon name="chevron-right" size={18} />
            </Link>
          ))}
          <div className="drawer__cta">
            <Button block iconRight="arrow-right" onClick={onBook}>
              Book a Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
