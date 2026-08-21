import type { Metadata } from "next";
import { Header } from "@/components/interactive/Header";
import { ConsultationModal } from "@/components/interactive/ConsultationModal";
import { MobileActionBar } from "@/components/interactive/MobileActionBar";
import { NetlifyFormsDetector } from "@/components/interactive/NetlifyFormsDetector";
import { REVEAL_SCRIPT } from "@/components/interactive/Reveal";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { WhyTrust } from "@/components/sections/WhyTrust";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Insights } from "@/components/sections/Insights";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { AnchorFocus } from "@/components/interactive/AnchorFocus";
import { canonicalUrl } from "@/lib/seo";

const TITLE = "Accountants in Durban | Tax, Bookkeeping & Advisory | AOL";
const DESCRIPTION =
  "AOL Accounting Academy SA provides bookkeeping, tax, payroll, financial statements and business advisory services for Durban and South African SMEs.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: canonicalUrl("/") },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: canonicalUrl("/"),
  },
};

export default function Home() {
  return (
    <div className="site site--with-mab">
      <Header />
      <main id="main">
        <Hero />
        <About />
        <WhyChoose />
        <Services />
        <Industries />
        <WhyTrust />
        <Pricing />
        <Process />
        <Testimonials />
        <Insights />
        <CTA />
      </main>
      <Footer />
      <MobileActionBar />
      <NetlifyFormsDetector />
      <ConsultationModal />
      <AnchorFocus />
      <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
    </div>
  );
}
