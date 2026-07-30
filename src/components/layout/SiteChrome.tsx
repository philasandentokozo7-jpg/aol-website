import type { ReactNode } from "react";
import { Header } from "@/components/interactive/Header";
import { Footer } from "@/components/sections/Footer";
import { ConsultationModal } from "@/components/interactive/ConsultationModal";
import { AnchorFocus } from "@/components/interactive/AnchorFocus";
import { REVEAL_SCRIPT } from "@/components/interactive/Reveal";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="site">
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <ConsultationModal />
      <AnchorFocus />
      <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
    </div>
  );
}
