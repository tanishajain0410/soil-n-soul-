import type { Metadata } from "next";
import LuxuryNavbar from "@/components/LuxuryNavbar";
import Link from "next/link";
import { ShieldCheck, Mail, Phone, Lock, Eye, FileText, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-[#0c0d0f] text-[#dcd6c8] selection:bg-[#dfbf80]/30 selection:text-white">
      {/* Luxury Navbar */}
      <LuxuryNavbar />

      {/* Hero Header */}
      <header className="relative pt-36 pb-20 px-6 sm:px-12 border-b border-[#dfbf80]/15 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#dfbf80]/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#dfbf80]/30 bg-[#dfbf80]/5 text-[#dfbf80] text-xs uppercase tracking-[0.2em] mb-6">
            <ShieldCheck size={14} />
            <span>Trust &amp; Transparency</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#f5f2eb] tracking-tight mb-6" style={{ fontFamily: "var(--sns-font-serif, serif)" }}>
            Privacy Policy
          </h1>

          <p className="text-base sm:text-lg text-[#a8a49a] max-w-2xl mx-auto font-sans leading-relaxed">
            At Soil &amp; Soul Travels, we honor your privacy with the same mindfulness and reverence that we bring to our bespoke journeys in Kashi.
          </p>

          <div className="mt-8 text-xs text-[#878377] uppercase tracking-widest font-mono">
            Effective Date: January 1, 2025 · Last Updated: September 2025
          </div>
        </div>
      </header>

      {/* Policy Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-12 py-16 sm:py-24 space-y-16">
        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif text-[#dfbf80] flex items-center gap-3" style={{ fontFamily: "var(--sns-font-serif, serif)" }}>
            <span className="text-xs font-mono text-[#dfbf80]/60 border border-[#dfbf80]/30 rounded-md px-2 py-0.5">01</span>
            Introduction &amp; Scope
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-[#c5c0b4] space-y-4 font-sans">
            <p>
              Soil &amp; Soul Travels (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates the website <span className="text-[#f5f2eb]">soilnsoultravels.com</span> and provides bespoke private travel concierge services, heritage walks, luxury boat charters, and cultural experiences in Varanasi, Uttar Pradesh, India.
            </p>
            <p>
              This Privacy Policy details how we collect, use, store, and safeguard your personal data when you interact with our website, request custom journey proposals, or travel with our local concierges.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-4 border-t border-white/5 pt-12">
          <h2 className="text-xl sm:text-2xl font-serif text-[#dfbf80] flex items-center gap-3" style={{ fontFamily: "var(--sns-font-serif, serif)" }}>
            <span className="text-xs font-mono text-[#dfbf80]/60 border border-[#dfbf80]/30 rounded-md px-2 py-0.5">02</span>
            Information We Collect
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-[#c5c0b4] space-y-4 font-sans">
            <p>We only collect information necessary to design, coordinate, and deliver your travel itinerary:</p>
            <ul className="list-disc list-inside space-y-2.5 pl-2 text-[#b0aba0]">
              <li><strong className="text-[#f5f2eb]">Contact Details:</strong> Full name, email address, telephone/WhatsApp number, and country of residence.</li>
              <li><strong className="text-[#f5f2eb]">Travel Preferences:</strong> Dates of travel, group size, specific journey interests (spiritual trails, culinary exploration, textile artisans), and budget preferences.</li>
              <li><strong className="text-[#f5f2eb]">Logistics &amp; Safety Data:</strong> Arrival flight/train details, dietary requirements, and physical mobility notes to ensure safe navigation of ancient ghat steps and boat boarding.</li>
              <li><strong className="text-[#f5f2eb]">Identity Verification:</strong> Government-issued ID or passport details when required by local Varanasi maritime regulations or boutique heritage haveli registrations.</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4 border-t border-white/5 pt-12">
          <h2 className="text-xl sm:text-2xl font-serif text-[#dfbf80] flex items-center gap-3" style={{ fontFamily: "var(--sns-font-serif, serif)" }}>
            <span className="text-xs font-mono text-[#dfbf80]/60 border border-[#dfbf80]/30 rounded-md px-2 py-0.5">03</span>
            How We Use Your Information
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-[#c5c0b4] space-y-4 font-sans">
            <p>Your personal information is used strictly to fulfill your travel experience:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-white/5 bg-[#131518]/60">
                <div className="text-[#dfbf80] text-sm font-semibold mb-1">Itinerary Curation</div>
                <div className="text-xs text-[#a09c91]">Designing customized daily travel proposals based on your preferences.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#131518]/60">
                <div className="text-[#dfbf80] text-sm font-semibold mb-1">Local Coordination</div>
                <div className="text-xs text-[#a09c91]">Arranging licensed private boats, temple scholars, and boutique stays.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#131518]/60">
                <div className="text-[#dfbf80] text-sm font-semibold mb-1">Concierge Communications</div>
                <div className="text-xs text-[#a09c91]">Providing live WhatsApp trip updates, weather advisories, and timing.</div>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#131518]/60">
                <div className="text-[#dfbf80] text-sm font-semibold mb-1">Customer Support</div>
                <div className="text-xs text-[#a09c91]">Assisting with special requests, schedule adjustments, or emergencies.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4 border-t border-white/5 pt-12">
          <h2 className="text-xl sm:text-2xl font-serif text-[#dfbf80] flex items-center gap-3" style={{ fontFamily: "var(--sns-font-serif, serif)" }}>
            <span className="text-xs font-mono text-[#dfbf80]/60 border border-[#dfbf80]/30 rounded-md px-2 py-0.5">04</span>
            Data Protection &amp; Third-Party Sharing
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-[#c5c0b4] space-y-4 font-sans">
            <p>
              We maintain a strict policy regarding your personal data: <strong className="text-[#f5f2eb]">We do not sell, rent, or trade your personal data to any third-party marketing or advertising networks.</strong>
            </p>
            <p>
              Data is shared only with verified local partners directly involved in your journey (such as licensed boat pilots, registered temple concierges, or verified boutique hotels) solely to the extent necessary to perform their services safely.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-4 border-t border-white/5 pt-12">
          <h2 className="text-xl sm:text-2xl font-serif text-[#dfbf80] flex items-center gap-3" style={{ fontFamily: "var(--sns-font-serif, serif)" }}>
            <span className="text-xs font-mono text-[#dfbf80]/60 border border-[#dfbf80]/30 rounded-md px-2 py-0.5">05</span>
            Your Rights &amp; Contact
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-[#c5c0b4] space-y-4 font-sans">
            <p>
              You have the right to request access to your personal information, request corrections, or ask for the deletion of your data once your journey is concluded.
            </p>
            <div className="mt-6 p-6 rounded-2xl border border-[#dfbf80]/20 bg-[#16181b] space-y-3">
              <div className="text-sm font-semibold text-[#f5f2eb]">Soil &amp; Soul Travels Concierge</div>
              <div className="text-xs text-[#a8a49a]">Assi Ghat Road, Varanasi, Uttar Pradesh 221005, India</div>
              <div className="flex flex-wrap gap-4 pt-2 text-xs">
                <a href="mailto:info@soilnsoultravels.com" className="text-[#dfbf80] hover:underline flex items-center gap-1.5">
                  <Mail size={13} /> info@soilnsoultravels.com
                </a>
                <a href="tel:+919580417547" className="text-[#dfbf80] hover:underline flex items-center gap-1.5">
                  <Phone size={13} /> +91 95804 17547
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Back Link */}
        <div className="pt-8 border-t border-white/10 flex justify-between items-center text-xs text-[#878377]">
          <Link href="/" className="hover:text-[#dfbf80] inline-flex items-center gap-2 transition-colors">
            <ArrowLeft size={14} /> Back to Homepage
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-[#dfbf80] transition-colors">
            View Terms &amp; Conditions &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
