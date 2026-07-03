"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Field } from "../ui/Field";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { OPEN_CONSULTATION_EVENT } from "./consultation-events";

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
    setSending(true);
    setError(null);
    const data = new FormData(e.currentTarget);
    data.set("form-name", FORM_NAME);
    try {
      // Netlify Forms: POST the urlencoded payload back to any path on our origin.
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(`Form POST failed: ${res.status}`);
      setSent(true);
    } catch {
      setError("Something went wrong sending your request. Please try again, or email us directly.");
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
                {/* Netlify honeypot — hidden from people, tempting for bots */}
                <p style={{ display: "none" }} aria-hidden="true">
                  <label>
                    Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>
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
                </div>
              </form>
            </>
          ))}
      </div>
    </div>
  );
}
