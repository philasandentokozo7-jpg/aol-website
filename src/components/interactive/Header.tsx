"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { openConsultation } from "./consultation-events";

const LOGO = "/assets/logo/aol-logo-full.png";

export const NAV: Array<[string, string]> = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Industries", "#industries"],
  ["Pricing", "#pricing"],
  ["Insights", "#insights"],
  ["Contact", "#contact"],
];

const NAV_IDS = ["home", "about", "services", "industries", "pricing", "insights", "contact"];

/** useScrollSpy — returns {scrolled, active} for the sticky header. */
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
  const onBook = useCallback(() => {
    setMenuOpen(false);
    openConsultation();
  }, []);

  return (
    <>
      <header className={`hdr ${scrolled ? "hdr--scrolled" : ""}`}>
        <div className="container hdr__inner">
          <a className="hdr__logo" href="#home" aria-label="AOL Accounting Academy SA — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="AOL Accounting Academy SA" width={176} height={42} />
          </a>
          <nav className="hdr__nav" aria-label="Primary">
            {NAV.map(([label, href]) => (
              <a key={href} className={`navlink ${active === href.slice(1) ? "navlink--active" : ""}`} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="hdr__actions">
            <Button className="hdr__cta" size="sm" iconRight="arrow-right" onClick={onBook}>
              Book a Free Consultation
            </Button>
            <button className="hdr__burger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <Icon name="menu" size={22} />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="drawer__scrim" onClick={() => setMenuOpen(false)}></div>
        <div className="drawer__panel" role="dialog" aria-label="Menu">
          <div className="drawer__top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO} alt="AOL Accounting Academy SA" width={159} height={38} />
            <button className="modal__close" style={{ position: "static" }} aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <Icon name="x" size={20} />
            </button>
          </div>
          {NAV.map(([label, href]) => (
            <a key={href} className="drawer__link" href={href} onClick={() => setMenuOpen(false)}>
              {label}
              <Icon name="chevron-right" size={18} />
            </a>
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
