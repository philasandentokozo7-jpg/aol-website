"use client";

import { PHONE_DISPLAY, PHONE_HREF, WHATSAPP_URL, isPublicValue } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { openConsultation } from "./consultation-events";

/** Persistent phone-first action strip — Call / WhatsApp / Book. */
export function MobileActionBar() {
  const showPhone = isPublicValue(PHONE_HREF) && isPublicValue(PHONE_DISPLAY);
  const showWhatsApp = isPublicValue(WHATSAPP_URL);

  return (
    <div className="mab" role="region" aria-label="Quick contact actions">
      <div className="mab__inner">
        {showPhone ? (
          <a className="mab__action" href={PHONE_HREF}>
            <Icon name="phone" size={18} />
            <span>Call</span>
          </a>
        ) : null}
        {showWhatsApp ? (
          <a className="mab__action" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="message-circle" size={18} />
            <span>WhatsApp</span>
          </a>
        ) : null}
        <button type="button" className="mab__action mab__action--primary" onClick={() => openConsultation()}>
          <Icon name="calendar" size={18} />
          <span>Book</span>
        </button>
      </div>
    </div>
  );
}
