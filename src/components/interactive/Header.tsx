"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { openConsultation } from "./consultation-events";
import { BRAND, TRADING_NAME } from "@/config/site";

export const NAV: Array<[string, string]> = [
  ["Home", "/#home"],
  ["About", "/#about"],
  ["Services", "/services"],
  ["Industries", "/#industries"],
  ["Pricing", "/#pricing"],
  ["Insights", "/#insights"],
  ["Contact", "/#contact"],
];

const NAV_IDS = ["home", "about", "services", "industries", "pricing", "insights", "contact"];

function useScrollSpy(ids: string[]) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const y = window.scrollY + 140;
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);
  return { scrolled, active };
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled, active } = useScrollSpy(NAV_IDS);
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

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return active === href.slice(2);
    if (href === "/services") return active === "services";
    return false;
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className={`hdr ${scrolled ? "hdr--scrolled" : ""}`}>
        <div className="container hdr__inner">
          <Link className="hdr__logo" href="/#home" aria-label={`${TRADING_NAME} — home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={BRAND.logoFull} alt={TRADING_NAME} width={60} height={42} fetchPriority="high" />
          </Link>
          <nav className="hdr__nav" aria-label="Primary">
            {NAV.map(([label, href]) => (
              <Link key={href} className={`navlink ${isActive(href) ? "navlink--active" : ""}`} href={href}>
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
