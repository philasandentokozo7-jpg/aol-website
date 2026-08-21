import type { Metadata } from "next";
import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookButton } from "@/components/interactive/BookButton";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/interactive/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BRAND, TRADING_NAME, XERO_PUBLIC_STATEMENT } from "@/config/site";
import { canonicalUrl } from "@/lib/seo";

const TITLE = "About AOL Accounting Academy SA";
const DESCRIPTION =
  "Learn how AOL Accounting Academy SA supports Durban and South African businesses with accounting, tax, payroll, cloud accounting and advisory services through a collaborative professional network.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: canonicalUrl("/about/") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: canonicalUrl("/about/") },
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <article className="section section--white page-hero">
        <div className="container page-content">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "About", path: "/about/" },
            ]}
          />
          <div className="about__grid" style={{ marginTop: "1.25rem" }}>
            <Reveal immediate>
              <div className="about__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={BRAND.officeImage}
                  alt="Professional accounting workspace supporting AOL Accounting Academy SA advisory work"
                  width={960}
                  height={720}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </Reveal>
            <Reveal delay="1" immediate>
              <SectionHeading
                as="h1"
                id="about-page-heading"
                eyebrow="About AOL"
                title="About AOL Accounting Academy SA"
              />
              <div className="prose" style={{ marginTop: "1.35rem" }}>
                <p>
                  At {TRADING_NAME}, we believe accounting should do more than satisfy compliance requirements—it should
                  provide the financial insight businesses need to make informed decisions and achieve sustainable
                  growth.
                </p>
                <p>
                  Our collaborative network of professionals combines academic excellence, practical industry experience,
                  and modern cloud accounting technology to deliver accurate financial information, strategic guidance,
                  and personalised support tailored to every client&apos;s goals.
                </p>
                <p>
                  We are committed to building long-term relationships founded on professionalism, integrity, and
                  measurable value.
                </p>
                <p>{XERO_PUBLIC_STATEMENT}</p>
              </div>
              <div className="page-cta-row">
                <BookButton size="lg" iconRight="arrow-right">
                  Book a Free Consultation
                </BookButton>
                <Button href="/services/" size="lg" variant="outline">
                  Explore services
                </Button>
                <Link className="text-link" href="/contact/">
                  Contact details
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </article>
    </SiteChrome>
  );
}
