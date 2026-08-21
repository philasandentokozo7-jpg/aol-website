import type { ReactNode } from "react";
import { Header } from "@/components/interactive/Header";
import { Footer } from "@/components/sections/Footer";
import { ConsultationModal } from "@/components/interactive/ConsultationModal";
import { MobileActionBar } from "@/components/interactive/MobileActionBar";
import { NetlifyFormsDetector } from "@/components/interactive/NetlifyFormsDetector";
import { AnchorFocus } from "@/components/interactive/AnchorFocus";
import { REVEAL_SCRIPT } from "@/components/interactive/Reveal";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="site site--with-mab">
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileActionBar />
      <NetlifyFormsDetector />
      <ConsultationModal />
      <AnchorFocus />
      <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
    </div>
  );
}
