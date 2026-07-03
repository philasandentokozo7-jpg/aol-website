import { Header } from "@/components/interactive/Header";
import { ConsultationModal, FORM_NAME } from "@/components/interactive/ConsultationModal";
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

export default function Home() {
  return (
    <div className="site">
      <Header />
      <main>
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

      {/* Static registration form for Netlify Forms: the build-time HTML must
          contain a form with data-netlify + every field name, so Netlify knows
          the schema. The visible modal form posts to it via AJAX. */}
      <form name={FORM_NAME} data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <input name="bot-field" />
        <input type="text" name="name" />
        <input type="text" name="business" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <select name="service">
          <option>Select a service…</option>
        </select>
        <textarea name="message"></textarea>
      </form>

      {/* Reveal-on-scroll without hydration: runs as soon as the DOM exists. */}
      <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
    </div>
  );
}
