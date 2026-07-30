import type { Metadata } from "next";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Button } from "@/components/ui/Button";
import { TRADING_NAME, WHATSAPP_URL } from "@/config/site";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
  description: `Thank you for contacting ${TRADING_NAME}.`,
};

export default function ThankYouPage() {
  return (
    <SiteChrome>
      <section className="section section--white">
        <div className="container legal__inner" style={{ textAlign: "center" }}>
          <h1>Thank you</h1>
          <p>
            If you submitted a consultation request through a connected form, a member of the {TRADING_NAME} team will
            respond within one business day.
          </p>
          <p>
            If you reached this page without submitting a form, you can still{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              message us on WhatsApp
            </a>{" "}
            or return home to book a consultation.
          </p>
          <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <Button href="/">Back to home</Button>
            <Button href="/#contact" variant="outline">
              Contact
            </Button>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
