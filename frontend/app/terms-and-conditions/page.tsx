import type { Metadata } from "next";
import Link from "next/link";
import { FileCheck, Mail, Phone, Scale, AlertCircle, Compass, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions governing private journeys, bespoke boat charters, and curated travel experiences with Soil n Soul Travels in Varanasi.",
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: {
    title: "Terms & Conditions | Soil n Soul Travels",
    description:
      "Transparent terms and booking conditions for private, curated journeys into the soul of Kashi.",
    images: [{ url: "/images/hero/hero-3.jpg" }],
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#0c0d0f] text-[#dcd6c8] selection:bg-[#dfbf80]/30 selection:text-white">

      {/* Hero Header */}
      <header className="relative pt-36 pb-20 px-6 sm:px-12 border-b border-[#dfbf80]/15 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#dfbf80]/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#dfbf80]/30 bg-[#dfbf80]/5 text-[#dfbf80] text-xs uppercase tracking-[0.2em] mb-6">
            <Scale size={14} />
            <span>Booking &amp; Travel Agreement</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#f5f2eb] tracking-tight mb-6" style={{ fontFamily: "var(--sns-font-serif, serif)" }}>
            Terms &amp; Conditions
          </h1>

          <p className="text-base sm:text-lg text-[#a8a49a] max-w-2xl mx-auto font-sans leading-relaxed">
            Transparent, thoughtful agreements crafted to ensure every private journey in Varanasi is seamless, respectful, and safe.
          </p>

          <div className="mt-8 text-xs text-[#878377] uppercase tracking-widest font-mono">
            Effective Date: January 1, 2025 · Last Updated: September 2025
          </div>
        </div>
      </header>

      {/* Terms Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-12 py-16 sm:py-24 space-y-16">
        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif text-[#dfbf80] flex items-center gap-3" style={{ fontFamily: "var(--sns-font-serif, serif)" }}>
            <span className="text-xs font-mono text-[#dfbf80]/60 border border-[#dfbf80]/30 rounded-md px-2 py-0.5">01</span>
            Bespoke Journey Bookings
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-[#c5c0b4] space-y-4 font-sans">
            <p>
              Soil &amp; Soul Travels designs custom, private journeys tailored to individual travelers, couples, and private families. By confirming an itinerary or paying an advance deposit, you agree to these Terms and Conditions.
            </p>
            <p>
              Each journey proposal is custom-crafted. All services, including private wooden boat charters, certified heritage concierges, artisan studio visits, and heritage stays, are reserved exclusively for your party.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-4 border-t border-white/5 pt-12">
          <h2 className="text-xl sm:text-2xl font-serif text-[#dfbf80] flex items-center gap-3" style={{ fontFamily: "var(--sns-font-serif, serif)" }}>
            <span className="text-xs font-mono text-[#dfbf80]/60 border border-[#dfbf80]/30 rounded-md px-2 py-0.5">02</span>
            Payment &amp; Confirmation Schedule
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-[#c5c0b4] space-y-4 font-sans">
            <ul className="list-disc list-inside space-y-2.5 pl-2 text-[#b0aba0]">
              <li><strong className="text-[#f5f2eb]">Deposit:</strong> A deposit is required to secure private boat charters, boutique haveli accommodations, and dedicated concierges.</li>
              <li><strong className="text-[#f5f2eb]">Balance Payment:</strong> The remaining balance is payable prior to or upon arrival in Varanasi as indicated in your bespoke quotation.</li>
              <li><strong className="text-[#f5f2eb]">Inclusions:</strong> Quotations clearly delineate all inclusions (e.g. boat charters, monument entries, guide fees) and exclusions (personal shopping, tips, international flights).</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-4 border-t border-white/5 pt-12">
          <h2 className="text-xl sm:text-2xl font-serif text-[#dfbf80] flex items-center gap-3" style={{ fontFamily: "var(--sns-font-serif, serif)" }}>
            <span className="text-xs font-mono text-[#dfbf80]/60 border border-[#dfbf80]/30 rounded-md px-2 py-0.5">03</span>
            River Safety &amp; Weather Protocols
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-[#c5c0b4] space-y-4 font-sans">
            <p>
              The safety of our travelers is paramount. River operations on the Ganges are subject to natural conditions and directives from the Varanasi District Administration and Water Police:
            </p>
            <div className="p-5 rounded-xl border border-white/5 bg-[#131518]/60 space-y-2">
              <div className="flex items-center gap-2 text-[#dfbf80] text-sm font-semibold">
                <AlertCircle size={15} />
                <span>Monsoon &amp; High-Current Protocol</span>
              </div>
              <p className="text-xs sm:text-sm text-[#a8a49a]">
                During periods of intense monsoon or swift river currents, local authorities may temporarily restrict small boat operations. In such events, boat itineraries are rescheduled or adapted to elevated ghat walks, temple trails, and rooftop Aarti viewings without loss of value.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-4 border-t border-white/5 pt-12">
          <h2 className="text-xl sm:text-2xl font-serif text-[#dfbf80] flex items-center gap-3" style={{ fontFamily: "var(--sns-font-serif, serif)" }}>
            <span className="text-xs font-mono text-[#dfbf80]/60 border border-[#dfbf80]/30 rounded-md px-2 py-0.5">04</span>
            Cultural Sanctity &amp; Temple Etiquette
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-[#c5c0b4] space-y-4 font-sans">
            <p>
              Varanasi is a living sacred city. We ask all guests to observe traditional norms of respect:
            </p>
            <ul className="list-disc list-inside space-y-2.5 pl-2 text-[#b0aba0]">
              <li>Dress modestly (covering shoulders and knees) when entering temple premises and sacred sanctums.</li>
              <li>Refrain strictly from photography at cremation ghats (Manikarnika and Harishchandra) to preserve the dignity of bereaved families.</li>
              <li>Footwear must be removed before entering temples, shrines, and traditional weaver karkhanas.</li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-4 border-t border-white/5 pt-12">
          <h2 className="text-xl sm:text-2xl font-serif text-[#dfbf80] flex items-center gap-3" style={{ fontFamily: "var(--sns-font-serif, serif)" }}>
            <span className="text-xs font-mono text-[#dfbf80]/60 border border-[#dfbf80]/30 rounded-md px-2 py-0.5">05</span>
            Cancellations &amp; Rescheduling
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-[#c5c0b4] space-y-4 font-sans">
            <p>
              We understand plans can change. Rescheduling requests made with reasonable advance notice are accommodated whenever boutique availability allows. Cancellations are subject to unrecoverable supplier commitments (such as non-refundable boutique stay deposits during peak auspicious festivals like Dev Deepawali or Maha Shivaratri).
            </p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="space-y-4 border-t border-white/5 pt-12">
          <h2 className="text-xl sm:text-2xl font-serif text-[#dfbf80] flex items-center gap-3" style={{ fontFamily: "var(--sns-font-serif, serif)" }}>
            <span className="text-xs font-mono text-[#dfbf80]/60 border border-[#dfbf80]/30 rounded-md px-2 py-0.5">06</span>
            Governing Law &amp; Jurisdiction
          </h2>
          <div className="text-sm sm:text-base leading-relaxed text-[#c5c0b4] space-y-4 font-sans">
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Varanasi, Uttar Pradesh, India.
            </p>
            <div className="mt-6 p-6 rounded-2xl border border-[#dfbf80]/20 bg-[#16181b] space-y-3">
              <div className="text-sm font-semibold text-[#f5f2eb]">Contact Us Regarding Your Booking</div>
              <div className="text-xs text-[#a8a49a]">Soil &amp; Soul Travels Concierge · Assi Ghat Road, Varanasi, UP, India</div>
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
          <Link href="/privacy-policy" className="hover:text-[#dfbf80] transition-colors">
            View Privacy Policy &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
