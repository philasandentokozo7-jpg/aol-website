import { Header } from "@/components/interactive/Header";
import { ConsultationModal } from "@/components/interactive/ConsultationModal";
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

export default function Home() {
  return (
    <div className="site">
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
      <ConsultationModal />
      <AnchorFocus />

      {/* Reveal-on-scroll without hydration: runs as soon as the DOM exists. */}
      <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
    </div>
  );
}
