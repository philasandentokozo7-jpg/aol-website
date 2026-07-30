"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Field } from "../ui/Field";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { OPEN_CONSULTATION_EVENT } from "./consultation-events";
import { FORMSPREE_ENDPOINT, TRADING_NAME, WHATSAPP_URL } from "@/config/site";
import { SERVICES } from "@/content/services";

const CM_SERVICES = ["Select a service…", ...SERVICES.map((s) => s.title), "Not sure yet"];

export const FORM_NAME = "consultation";

export function ConsultationModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const cardRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<Element | null>(null);
  const titleId = useId();
  const errorId = useId();

  useEffect(() => {
    const onOpen = () => {
      triggerRef.current = document.activeElement;
      setSent(false);
      setError(null);
      setFieldErrors({});
      setSending(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSULTATION_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONSULTATION_EVENT, onOpen);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    if (triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
    }
  }, []);

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
    const firstField = cardRef.current?.querySelector<HTMLElement>("input, button, select, textarea");
    firstField?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
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

    // No delivery endpoint configured yet: do NOT pretend the request was sent.
    if (!FORMSPREE_ENDPOINT) {
      setError(
        "Our online booking form isn’t connected yet. Please message us on WhatsApp and we’ll respond within one business day."
      );
      return;
    }

    setSending(true);
    const data = new FormData(form);
    // Strip marketing consent into a clear yes/no without inventing side effects.
    if (!data.get("marketing_consent")) data.set("marketing_consent", "no");
    else data.set("marketing_consent", "yes");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(`Form POST failed: ${res.status}`);
      setSent(true);
      form.reset();
    } catch {
      setError("Something went wrong sending your request. Please try again, or message us on WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className={`modal ${open ? "open" : ""}`} aria-hidden={!open} inert={!open || undefined}>
      <div className="modal__scrim" onClick={onClose}></div>
      <div
        ref={cardRef}
        className="modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <Icon name="x" size={20} />
        </button>

        {open &&
          (sent ? (
            <div className="modal__success" role="status" aria-live="polite">
              <span className="ok">
                <Icon name="check" size={30} stroke={2.5} />
              </span>
              <SectionHeading
                align="center"
                title="Request received"
                lead="Thanks — a member of the AOL team will be in touch within one business day."
              />
              <Button onClick={onClose}>Done</Button>
            </div>
          ) : (
            <>
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
                  We collect this information to respond to your consultation request for {TRADING_NAME}. Required
                  fields are marked with an asterisk. See our{" "}
                  <a href="/privacy" style={{ color: "var(--navy-900)", fontWeight: 600 }}>
                    Privacy Notice
                  </a>
                  .
                </p>
              </div>
              <form className="modal__form" name={FORM_NAME} onSubmit={submit} noValidate>
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: "none" }}
                />
                <input type="hidden" name="_subject" value={`New consultation request — ${TRADING_NAME}`} />
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
                      aria-describedby={fieldErrors.name ? "cm-name-err" : undefined}
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
                      Optional: I would like to receive occasional business updates from {TRADING_NAME}. This is not
                      required to submit a consultation request.
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
                    Prefer to chat?{" "}
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--navy-900)", fontWeight: 600 }}
                    >
                      Message us on WhatsApp
                    </a>
                  </p>
                </div>
              </form>
            </>
          ))}
      </div>
    </div>
  );
}
