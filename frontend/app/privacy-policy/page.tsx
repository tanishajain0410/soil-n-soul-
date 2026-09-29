import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Mail, Phone, ArrowLeft, ArrowRight, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Soil n Soul Travels. Learn how we collect, protect, and handle your personal information for bespoke Varanasi travel experiences.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Soil n Soul Travels",
    description:
      "Our commitment to protecting your personal data and privacy across all private Varanasi journeys.",
    images: [{ url: "/images/hero/hero-3.jpg" }],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page-root selection:bg-[#d7b875]/30 selection:text-[#2c120d]">

      {/* Hero Header */}
      <header className="legal-hero" aria-label="Privacy Policy Header">
        <div className="legal-hero-glow" />

        <div className="legal-hero-inner">
          {/* Breadcrumb Navigation */}
          <nav className="legal-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="legal-breadcrumb-sep">/</span>
            <span>Legal</span>
            <span className="legal-breadcrumb-sep">/</span>
            <span className="legal-breadcrumb-current">Privacy Policy</span>
          </nav>

          <div className="legal-eyebrow-badge">
            <ShieldCheck size={14} className="text-[#d7b875]" />
            <span>Trust &amp; Transparency</span>
          </div>

          <h1 className="legal-hero-title">
            Privacy <em>Policy</em>
          </h1>

          <p className="legal-hero-subtitle">
            At Soil &amp; Soul Travels, we honor your privacy with the same mindfulness and reverence that we bring to our bespoke journeys in Kashi.
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
          <nav className="legal-toc-bar" aria-label="Privacy Policy Sections">
            <a href="#section-01" className="legal-toc-item">
              <span>01</span> Introduction &amp; Scope
            </a>
            <a href="#section-02" className="legal-toc-item">
              <span>02</span> Information We Collect
            </a>
            <a href="#section-03" className="legal-toc-item">
              <span>03</span> Usage of Data
            </a>
            <a href="#section-04" className="legal-toc-item">
              <span>04</span> Data Protection
            </a>
            <a href="#section-05" className="legal-toc-item">
              <span>05</span> Your Rights &amp; Contact
            </a>
          </nav>

          {/* Section 1 */}
          <section id="section-01" className="legal-section">
            <div className="legal-section-header">
              <span className="legal-number-badge">01</span>
              <h2 className="legal-section-title">Introduction &amp; Scope</h2>
            </div>
            <div className="legal-prose">
              <p>
                Soil &amp; Soul Travels (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates the website <span className="legal-domain-highlight">soilnsoultravels.com</span> and provides bespoke private travel concierge services, heritage walks, luxury boat charters, and cultural experiences in Varanasi, Uttar Pradesh, India.
              </p>
              <p>
                This Privacy Policy details how we collect, use, store, and safeguard your personal data when you interact with our website, request custom journey proposals, or travel with our local concierges.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-02" className="legal-section">
            <div className="legal-section-header">
              <span className="legal-number-badge">02</span>
              <h2 className="legal-section-title">Information We Collect</h2>
            </div>
            <div className="legal-prose">
              <p>We only collect information necessary to design, coordinate, and deliver your travel itinerary:</p>
              <ul className="legal-list">
                <li>
                  <strong>Contact Details:</strong> Full name, email address, telephone/WhatsApp number, and country of residence.
                </li>
                <li>
                  <strong>Travel Preferences:</strong> Dates of travel, group size, specific journey interests (spiritual trails, culinary exploration, textile artisans), and budget preferences.
                </li>
                <li>
                  <strong>Logistics &amp; Safety Data:</strong> Arrival flight/train details, dietary requirements, and physical mobility notes to ensure safe navigation of ancient ghat steps and boat boarding.
                </li>
                <li>
                  <strong>Identity Verification:</strong> Government-issued ID or passport details when required by local Varanasi maritime regulations or boutique heritage haveli registrations.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-03" className="legal-section">
            <div className="legal-section-header">
              <span className="legal-number-badge">03</span>
              <h2 className="legal-section-title">How We Use Your Information</h2>
            </div>
            <div className="legal-prose">
              <p>Your personal information is used strictly to fulfill your travel experience:</p>
              <div className="legal-card-grid">
                <div className="legal-feature-card">
                  <div className="legal-card-title">Itinerary Curation</div>
                  <div className="legal-card-desc">Designing customized daily travel proposals based on your preferences.</div>
                </div>
                <div className="legal-feature-card">
                  <div className="legal-card-title">Local Coordination</div>
                  <div className="legal-card-desc">Arranging licensed private boats, temple scholars, and boutique stays.</div>
                </div>
                <div className="legal-feature-card">
                  <div className="legal-card-title">Concierge Communications</div>
                  <div className="legal-card-desc">Providing live WhatsApp trip updates, weather advisories, and timing.</div>
                </div>
                <div className="legal-feature-card">
                  <div className="legal-card-title">Customer Support</div>
                  <div className="legal-card-desc">Assisting with special requests, schedule adjustments, or emergencies.</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-04" className="legal-section">
            <div className="legal-section-header">
              <span className="legal-number-badge">04</span>
              <h2 className="legal-section-title">Data Protection &amp; Third-Party Sharing</h2>
            </div>
            <div className="legal-prose">
              <p>
                We maintain a strict policy regarding your personal data: <strong>We do not sell, rent, or trade your personal data to any third-party marketing or advertising networks.</strong>
              </p>
              <p>
                Data is shared only with verified local partners directly involved in your journey (such as licensed boat pilots, registered temple concierges, or verified boutique hotels) solely to the extent necessary to perform their services safely.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-05" className="legal-section">
            <div className="legal-section-header">
              <span className="legal-number-badge">05</span>
              <h2 className="legal-section-title">Your Rights &amp; Contact</h2>
            </div>
            <div className="legal-prose">
              <p>
                You have the right to request access to your personal information, request corrections, or ask for the deletion of your data once your journey is concluded.
              </p>
              <div className="legal-contact-box">
                <div className="legal-contact-name">Soil &amp; Soul Travels Concierge</div>
                <div className="legal-contact-address">Assi Ghat Road, Varanasi, Uttar Pradesh 221005, India</div>
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
            <Link href="/terms-and-conditions" className="legal-nav-link legal-nav-link-primary">
              View Terms &amp; Conditions <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
