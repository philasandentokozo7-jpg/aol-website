"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Field } from "../ui/Field";
import { Icon } from "../ui/Icon";
import { OPEN_CONSULTATION_EVENT } from "./consultation-events";
import { PHONE_DISPLAY, PHONE_HREF, TRADING_NAME, WHATSAPP_URL } from "@/config/site";
import { SERVICES } from "@/content/services";
import { NETLIFY_FORM_NAME, NETLIFY_HONEYPOT_FIELD } from "@/content/enquiry-form";

const CM_SERVICES = ["Select a service…", ...SERVICES.map((s) => s.title), "Not sure yet"];
const MODAL_HASH = "#consultation";
const BODY_LOCK_CLASS = "aol-modal-open";

const NETLIFY_FORM_ATTRS = {
  "data-netlify": "true",
  "netlify-honeypot": NETLIFY_HONEYPOT_FIELD,
} as const;

type HistoryState = { aolConsultation?: boolean } | null;

function unlockBody() {
  document.body.classList.remove(BODY_LOCK_CLASS);
  document.body.style.removeProperty("overflow");
}

function lockBody() {
  document.body.classList.add(BODY_LOCK_CLASS);
}

function clearModalHash() {
  if (window.location.hash !== MODAL_HASH) return;
  const next = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(null, "", next);
}

export function ConsultationModal() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const cardRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<Element | null>(null);
  const openRef = useRef(false);
  const ignoreNextPopRef = useRef(false);
  const titleId = useId();
  const errorId = useId();

  const resetVisualState = useCallback(() => {
    openRef.current = false;
    setOpen(false);
    setSending(false);
    unlockBody();
  }, []);

  /** Close without touching history (route change, bfcache restore, in-modal link). */
  const dismiss = useCallback(() => {
    resetVisualState();
    clearModalHash();
  }, [resetVisualState]);

  /** Close from X / Escape / scrim — sync with the history entry we pushed on open. */
  const onClose = useCallback(() => {
    if (!openRef.current) {
      unlockBody();
      return;
    }
    resetVisualState();
    const state = window.history.state as HistoryState;
    if (state?.aolConsultation) {
      ignoreNextPopRef.current = true;
      window.history.back();
    } else {
      clearModalHash();
    }
    if (triggerRef.current instanceof HTMLElement) {
      const el = triggerRef.current;
      requestAnimationFrame(() => el.focus());
    }
  }, [resetVisualState]);

  const onOpen = useCallback(() => {
    if (openRef.current) return;
    triggerRef.current = document.activeElement;
    setError(null);
    setFieldErrors({});
    setSending(false);
    openRef.current = true;
    setOpen(true);
    lockBody();
    if (window.location.hash !== MODAL_HASH) {
      window.history.pushState({ aolConsultation: true }, "", MODAL_HASH);
    }
  }, []);

  useEffect(() => {
    const handleOpenEvent = () => onOpen();
    window.addEventListener(OPEN_CONSULTATION_EVENT, handleOpenEvent);
    return () => window.removeEventListener(OPEN_CONSULTATION_EVENT, handleOpenEvent);
  }, [onOpen]);

  useEffect(() => {
    const onPopState = () => {
      if (ignoreNextPopRef.current) {
        ignoreNextPopRef.current = false;
        return;
      }
      if (openRef.current) {
        resetVisualState();
        clearModalHash();
      }
    };
    const onPageShow = () => {
      // Back-forward cache can restore a locked body + stuck overlay.
      ignoreNextPopRef.current = false;
      resetVisualState();
      if (window.location.hash === MODAL_HASH) clearModalHash();
    };
    const onPageHide = () => unlockBody();

    window.addEventListener("popstate", onPopState);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("pagehide", onPageHide);
      unlockBody();
    };
  }, [resetVisualState]);

  // If the user navigates to another page while the modal is open, drop it cleanly.
  const pathRef = useRef(pathname);
  useEffect(() => {
    if (pathRef.current !== pathname) {
      pathRef.current = pathname;
      if (openRef.current) dismiss();
    }
  }, [pathname, dismiss]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !cardRef.current) return;
      const focusables = cardRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input:not([tabindex="-1"]), select, [tabindex]:not([tabindex="-1"])'
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
    lockBody();
    const focusTimer = window.setTimeout(() => {
      cardRef.current
        ?.querySelector<HTMLElement>('input:not([tabindex="-1"]), select, textarea, button.modal__close')
        ?.focus();
    }, 0);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const validate = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const next: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    if (!name) next.name = "Full name is required.";
    if (!email) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setError(null);
    const form = e.currentTarget;
    if (!validate(form)) {
      setError("Please correct the highlighted fields and try again.");
      return;
    }

    setSending(true);
    const data = new FormData(form);
    data.set("form-name", NETLIFY_FORM_NAME);
    if (!data.get("marketing_consent")) data.set("marketing_consent", "no");
    else data.set("marketing_consent", "yes");

    const body = new URLSearchParams();
    data.forEach((value, key) => {
      if (typeof value === "string") body.append(key, value);
    });

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Netlify Forms POST failed: ${res.status}`);
      dismiss();
      window.location.assign("/thank-you/");
    } catch {
      setError(
        "Something went wrong sending your request. Please try again, call us, or message us on WhatsApp."
      );
      setSending(false);
    }
  };

  return (
    <div className={`modal ${open ? "open" : ""}`} aria-hidden={!open} inert={!open || undefined}>
      <div className="modal__scrim" onClick={onClose} />
      <div
        ref={cardRef}
        className="modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          <Icon name="x" size={20} />
        </button>

        {/* Keep form mounted so open/close stays instant and never shows an empty overlay. */}
        <div className="modal__head">
          <Eyebrow>Free Consultation</Eyebrow>
          <h2
            id={titleId}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "var(--text-2xl)",
              color: "var(--navy-900)",
              letterSpacing: "var(--tracking-tight)",
              margin: 0,
            }}
          >
            Tell us about your business
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "var(--text-base)" }}>
            We collect this information to respond to your consultation request for {TRADING_NAME}. Required fields are
            marked with an asterisk. See our{" "}
            <a href="/privacy/" style={{ color: "var(--navy-900)", fontWeight: 600 }} onClick={dismiss}>
              Privacy Notice
            </a>
            .
          </p>
        </div>
        <form
          className="modal__form"
          name={NETLIFY_FORM_NAME}
          method="POST"
          {...NETLIFY_FORM_ATTRS}
          onSubmit={submit}
          noValidate
        >
          <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
          <p className="netlify-honeypot" aria-hidden="true">
            <label>
              Do not fill this out if you are human
              <input type="text" name={NETLIFY_HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <Field label="Full name" htmlFor="cm-name" required error={fieldErrors.name}>
            <div className="fld">
              <Icon name="user" size={18} />
              <input
                id="cm-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Thandi Mokoena"
                required
                aria-invalid={fieldErrors.name ? true : undefined}
              />
            </div>
          </Field>
          <Field label="Business name" htmlFor="cm-biz">
            <div className="fld">
              <Icon name="building-2" size={18} />
              <input id="cm-biz" name="business" type="text" autoComplete="organization" placeholder="Your company" />
            </div>
          </Field>
          <Field label="Email" htmlFor="cm-email" required error={fieldErrors.email}>
            <div className="fld">
              <Icon name="mail" size={18} />
              <input
                id="cm-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.co.za"
                required
                aria-invalid={fieldErrors.email ? true : undefined}
              />
            </div>
          </Field>
          <Field label="Phone" htmlFor="cm-phone">
            <div className="fld">
              <Icon name="phone" size={18} />
              <input id="cm-phone" name="phone" type="tel" autoComplete="tel" placeholder="071 234 5678" />
            </div>
          </Field>
          <div className="full">
            <Field label="Service needed" htmlFor="cm-svc">
              <div className="fld fld--select">
                <select id="cm-svc" name="service" defaultValue="Select a service…">
                  {CM_SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <Icon className="chev" name="chevron-down" size={18} />
              </div>
            </Field>
          </div>
          <div className="full">
            <Field label="How can we help?" htmlFor="cm-msg">
              <textarea
                className="fld-textarea"
                id="cm-msg"
                name="message"
                rows={3}
                placeholder="A sentence or two about your business…"
              ></textarea>
            </Field>
          </div>
          <div className="full modal__consent">
            <label className="modal__check">
              <input type="checkbox" name="marketing_consent" value="yes" />
              <span>
                Optional: I would like to receive occasional business updates from {TRADING_NAME}. This is not required
                to submit a consultation request.
              </span>
            </label>
          </div>
          {error ? (
            <div className="full" id={errorId} role="alert" aria-live="assertive">
              <p className="modal__form-error">{error}</p>
            </div>
          ) : null}
          <div className="full">
            <Button type="submit" block size="lg" iconRight="arrow-right" disabled={sending} aria-busy={sending}>
              {sending ? "Sending…" : "Request my consultation"}
            </Button>
            <p
              style={{
                marginTop: "0.75rem",
                textAlign: "center",
                fontSize: "var(--text-sm)",
                color: "var(--text-muted)",
              }}
            >
              Prefer to talk?{" "}
              <a href={PHONE_HREF} style={{ color: "var(--navy-900)", fontWeight: 600 }}>
                {PHONE_DISPLAY}
              </a>
              {" · "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--navy-900)", fontWeight: 600 }}
              >
                WhatsApp
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
