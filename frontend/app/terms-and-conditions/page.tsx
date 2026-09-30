import type { Metadata } from "next";
import Link from "next/link";
import { Scale, Mail, Phone, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions governing private journeys, bespoke boat charters, and curated travel experiences with SoilNSoul Travels in Varanasi.",
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: {
    title: "Terms & Conditions | SoilNSoul Travels",
    description:
      "Transparent terms and booking conditions for private, curated journeys into the soul of Kashi.",
    images: [{ url: "/images/hero/hero-3.jpg" }],
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="legal-page-root selection:bg-[#d7b875]/30 selection:text-[#2c120d]">

      {/* Hero Header */}
      <header className="legal-hero" aria-label="Terms and Conditions Header">
        <div className="legal-hero-glow" />

        <div className="legal-hero-inner">
          {/* Breadcrumb Navigation */}
          <nav className="legal-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="legal-breadcrumb-sep">/</span>
            <span>Legal</span>
            <span className="legal-breadcrumb-sep">/</span>
            <span className="legal-breadcrumb-current">Terms &amp; Conditions</span>
          </nav>

          <div className="legal-eyebrow-badge">
            <Scale size={14} className="text-[#d7b875]" />
            <span>Booking &amp; Travel Agreement</span>
          </div>

          <h1 className="legal-hero-title">
            Terms &amp; <em>Conditions</em>
          </h1>

          <p className="legal-hero-subtitle">
            Transparent, thoughtful agreements crafted to ensure every private journey in Varanasi is seamless, respectful, and safe.
          </p>

          <div>
            <span className="legal-meta-pill">
              Effective Date: January 1, 2025 · Last Updated: September 2025
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="legal-main">
        <div className="legal-paper-card">

          {/* Quick-Jump Table of Contents */}
          <nav className="legal-toc-bar" aria-label="Terms & Conditions Sections">
            <a href="#section-01" className="legal-toc-item">
              <span>01</span> Bookings
            </a>
            <a href="#section-02" className="legal-toc-item">
              <span>02</span> Payments
            </a>
            <a href="#section-03" className="legal-toc-item">
              <span>03</span> River Safety
            </a>
            <a href="#section-04" className="legal-toc-item">
              <span>04</span> Etiquette
            </a>
            <a href="#section-05" className="legal-toc-item">
              <span>05</span> Cancellations
            </a>
            <a href="#section-06" className="legal-toc-item">
              <span>06</span> Jurisdiction
            </a>
          </nav>

          {/* Section 1 */}
          <section id="section-01" className="legal-section">
            <div className="legal-section-header">
              <span className="legal-number-badge">01</span>
              <h2 className="legal-section-title">Bespoke Journey Bookings</h2>
            </div>
            <div className="legal-prose">
              <p>
                SoilNSoul Travels designs custom, private journeys tailored to individual travelers, couples, and private families. By confirming an itinerary or paying an advance deposit, you agree to these Terms and Conditions.
              </p>
              <p>
                Each journey proposal is custom-crafted. All services, including private wooden boat charters, certified heritage concierges, artisan studio visits, and heritage stays, are reserved exclusively for your party.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-02" className="legal-section">
            <div className="legal-section-header">
              <span className="legal-number-badge">02</span>
              <h2 className="legal-section-title">Payment &amp; Confirmation Schedule</h2>
            </div>
            <div className="legal-prose">
              <ul className="legal-list">
                <li>
                  <strong>Deposit:</strong> A deposit is required to secure private boat charters, boutique haveli accommodations, and dedicated concierges.
                </li>
                <li>
                  <strong>Balance Payment:</strong> The remaining balance is payable prior to or upon arrival in Varanasi as indicated in your bespoke quotation.
                </li>
                <li>
                  <strong>Inclusions:</strong> Quotations clearly delineate all inclusions (e.g. boat charters, monument entries, guide fees) and exclusions (personal shopping, tips, international flights).
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-03" className="legal-section">
            <div className="legal-section-header">
              <span className="legal-number-badge">03</span>
              <h2 className="legal-section-title">River Safety &amp; Weather Protocols</h2>
            </div>
            <div className="legal-prose">
              <p>
                The safety of our travelers is paramount. River operations on the Ganges are subject to natural conditions and directives from the Varanasi District Administration and Water Police:
              </p>
              <div className="legal-alert-box">
                <div className="legal-alert-title">
                  <AlertCircle size={15} />
                  <span>Monsoon &amp; High-Current Protocol</span>
                </div>
                <p className="legal-alert-desc">
                  During periods of intense monsoon or swift river currents, local authorities may temporarily restrict small boat operations. In such events, boat itineraries are rescheduled or adapted to elevated ghat walks, temple trails, and rooftop Aarti viewings without loss of value.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-04" className="legal-section">
            <div className="legal-section-header">
              <span className="legal-number-badge">04</span>
              <h2 className="legal-section-title">Cultural Sanctity &amp; Temple Etiquette</h2>
            </div>
            <div className="legal-prose">
              <p>
                Varanasi is a living sacred city. We ask all guests to observe traditional norms of respect:
              </p>
              <ul className="legal-list">
                <li>
                  Dress modestly (covering shoulders and knees) when entering temple premises and sacred sanctums.
                </li>
                <li>
                  Refrain strictly from photography at cremation ghats (Manikarnika and Harishchandra) to preserve the dignity of bereaved families.
                </li>
                <li>
                  Footwear must be removed before entering temples, shrines, and traditional weaver karkhanas.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-05" className="legal-section">
            <div className="legal-section-header">
              <span className="legal-number-badge">05</span>
              <h2 className="legal-section-title">Cancellations &amp; Rescheduling</h2>
            </div>
            <div className="legal-prose">
              <p>
                We understand plans can change. Rescheduling requests made with reasonable advance notice are accommodated whenever boutique availability allows. Cancellations are subject to unrecoverable supplier commitments (such as non-refundable boutique stay deposits during peak auspicious festivals like Dev Deepawali or Maha Shivaratri).
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="section-06" className="legal-section">
            <div className="legal-section-header">
              <span className="legal-number-badge">06</span>
              <h2 className="legal-section-title">Governing Law &amp; Jurisdiction</h2>
            </div>
            <div className="legal-prose">
              <p>
                These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Varanasi, Uttar Pradesh, India.
              </p>
              <div className="legal-contact-box">
                <div className="legal-contact-name">Contact Us Regarding Your Booking</div>
                <div className="legal-contact-address">SoilNSoul Travels Concierge · Assi Ghat Road, Varanasi, UP, India</div>
                <div className="legal-contact-links">
                  <a href="mailto:info@soilnsoultravels.com" className="legal-contact-link">
                    <Mail size={14} /> info@soilnsoultravels.com
                  </a>
                  <a href="tel:+919580417547" className="legal-contact-link">
                    <Phone size={14} /> +91 95804 17547
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Navigation */}
          <div className="legal-bottom-nav">
            <Link href="/" className="legal-nav-link">
              <ArrowLeft size={14} /> Back to Homepage
            </Link>
            <Link href="/privacy-policy" className="legal-nav-link legal-nav-link-primary">
              View Privacy Policy <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
