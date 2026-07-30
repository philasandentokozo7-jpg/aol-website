import { SiteChrome } from "@/components/layout/SiteChrome";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="section section--white">
        <div className="container legal__inner" style={{ textAlign: "center" }}>
          <h1>Page not found</h1>
          <p>The page you requested is unavailable. You can return home or explore our services.</p>
          <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <Button href="/">Home</Button>
            <Button href="/services" variant="outline">
              Services
            </Button>
            <Button href="/#contact" variant="ghost">
              Contact
            </Button>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
