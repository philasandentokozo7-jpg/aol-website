"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Field } from "../ui/Field";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { OPEN_CONSULTATION_EVENT } from "./consultation-events";
import { FORMSPREE_ENDPOINT, WHATSAPP_URL } from "@/config/site";

const CM_SERVICES = [
  "Select a service…",
  "Accounting & Bookkeeping",
  "Payroll Administration",
  "Taxation Services",
  "Financial Statements",
  "Management Accounting",
  "Business Advisory",
  "CIPC Services",
  "Cloud Accounting / Xero",
  "Cash Flow Management",
  "Accounting Training",
  "Not sure yet",
];

export const FORM_NAME = "consultation";

export function ConsultationModal() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onOpen = () => {
      setSent(false);
      setError(null);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSULTATION_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONSULTATION_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // No delivery endpoint configured yet: do NOT pretend the request was sent.
    // Be honest and route the visitor to WhatsApp instead.
    if (!FORMSPREE_ENDPOINT) {
      setError(
        "Our online booking form isn’t connected yet. Please message us on WhatsApp and we’ll respond within one business day."
      );
      return;
    }

    setSending(true);
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(`Form POST failed: ${res.status}`);
      setSent(true);
    } catch {
      setError("Something went wrong sending your request. Please try again, or message us on WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  const onClose = () => setOpen(false);

  return (
    <div className={`modal ${open ? "open" : ""}`} aria-hidden={!open} inert={!open || undefined}>
      <div className="modal__scrim" onClick={onClose}></div>
      <div className="modal__card" role="dialog" aria-modal="true" aria-label="Book a free consultation">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <Icon name="x" size={20} />
        </button>

        {open &&
          (sent ? (
            <div className="modal__success">
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
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: "var(--text-2xl)",
                    color: "var(--navy-900)",
                    letterSpacing: "var(--tracking-tight)",
                  }}
                >
                  Tell us about your business
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "var(--text-base)" }}>
                  No cost, no obligation — just a clear next step.
                </p>
              </div>
              <form className="modal__form" name={FORM_NAME} onSubmit={submit}>
                {/* Formspree honeypot — hidden from people, tempting for bots */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: "none" }}
                />
                <input type="hidden" name="_subject" value="New consultation request — AOL Accounting Academy SA" />
                <Field label="Full name" htmlFor="cm-name" required>
                  <div className="fld">
                    <Icon name="user" size={18} />
                    <input id="cm-name" name="name" type="text" placeholder="Thandi Mokoena" required />
                  </div>
                </Field>
                <Field label="Business name" htmlFor="cm-biz">
                  <div className="fld">
                    <Icon name="building-2" size={18} />
                    <input id="cm-biz" name="business" type="text" placeholder="Your company" />
                  </div>
                </Field>
                <Field label="Email" htmlFor="cm-email" required>
                  <div className="fld">
                    <Icon name="mail" size={18} />
                    <input id="cm-email" name="email" type="email" placeholder="you@company.co.za" required />
                  </div>
                </Field>
                <Field label="Phone" htmlFor="cm-phone">
                  <div className="fld">
                    <Icon name="phone" size={18} />
                    <input id="cm-phone" name="phone" type="tel" placeholder="071 234 5678" />
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
                  <Field label="How can we help?" htmlFor="cm-msg" error={error}>
                    <textarea
                      className="fld-textarea"
                      id="cm-msg"
                      name="message"
                      rows={3}
                      placeholder="A sentence or two about your business…"
                    ></textarea>
                  </Field>
                </div>
                <div className="full">
                  <Button type="submit" block size="lg" iconRight="arrow-right" disabled={sending}>
                    {sending ? "Sending…" : "Request my consultation"}
                  </Button>
                  <p style={{ marginTop: "0.75rem", textAlign: "center", fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
                    Prefer to chat?{" "}
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--navy-900)", fontWeight: 600 }}>
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
