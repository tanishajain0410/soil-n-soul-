"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
import { whatsapp } from "@/data/journeys";

const interestOptions = [
  "Spiritual",
  "Heritage",
  "Food",
  "Photography",
  "Celebrations",
  "Slow travel",
];

export default function AboutClient() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const interests = data.getAll("interests").join(", ") || "All experiences";
    const text = `Hello Soil n Soul,\nI would love to design my private Varanasi journey.\n\n*Name:* ${data.get(
      "name"
    )}\n*WhatsApp:* ${data.get("contact")}\n*Email:* ${
      data.get("email") || "Not provided"
    }\n*Preferred Dates:* ${data.get("dates") || "Flexible"}\n*Guests:* ${
      data.get("guests") || "2"
    }\n*Interests:* ${interests}\n*Message:* ${
      data.get("message") || "Looking forward to your guidance."
    }`;

    const link = whatsapp(text);
    setWhatsappLink(link);
    setSubmitted(true);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="about-page-root">

      {/* ========================================================
          2. HERO SECTION
      ======================================================== */}
      <section className="about-hero" aria-label="Our Story - Kashi is our home">
        {/* Background Panoramic Image */}
        <div className="about-hero-bg">
          <Image
            src="/images/about-hero-sunset.jpg"
            alt="Cinematic sunset over the Ganges and ancient riverfront temples of Varanasi"
            fill
            priority
            sizes="100vw"
            quality={95}
          />
        </div>

        {/* Cinematic Dark Gradient Overlay */}
        <div className="about-hero-overlay" />

        {/* Content Container */}
        <div className="about-hero-inner">
          <div className="about-hero-left">
            <span className="about-eyebrow">OUR STORY</span>
            <h1 className="about-hero-heading">
              Kashi is our home.
              <em>Sharing it is our calling.</em>
            </h1>
            <p className="about-hero-subtext">
              Authenticity, transparency, and heartfelt hospitality. A local connection
              that makes every journey more meaningful.
            </p>
            <a href="#story" className="about-hero-btn">
              <span>OUR STORY</span>
              <ArrowRight size={13} />
            </a>
          </div>

          <div className="about-hero-right">
            <span className="about-hero-script">More than a destination</span>
            <div className="about-hero-vertical-meta" aria-label="People, Places, Stories, Kashi">
              <span>PEOPLE</span>
              <span>PLACES</span>
              <span>STORIES</span>
              <span>KASHI</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. FOUNDER / OUR STORY SECTION
      ======================================================== */}
      <section id="story" className="about-story-section" aria-label="Founder and Our Story">
        {/* Background Temple Watermark along right edge */}
        <div className="about-story-watermark" aria-hidden="true" />

        <div className="about-story-inner">
          {/* Left Column: Layered Editorial Photo Collage */}
          <div className="about-founder-collage">
            {/* Background filigree / mandala motifs */}
            <svg
              className="about-founder-filigree"
              viewBox="0 0 100 100"
              fill="none"
              stroke="#b8860b"
              strokeWidth="0.7"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
              <polygon points="50,10 90,50 50,90 10,50" />
              <circle cx="50" cy="50" r="28" />
              <path d="M50 5v90M5 50h90M18 18l64 64M18 82l64-64" />
            </svg>

            <svg
              className="about-founder-filigree-right"
              viewBox="0 0 100 100"
              fill="none"
              stroke="#b8860b"
              strokeWidth="0.6"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r="40" strokeDasharray="2 4" />
              <polygon points="50,15 85,50 50,85 15,50" />
              <circle cx="50" cy="50" r="22" />
            </svg>

            {/* Inset Photo 1: Upper-left Temple with evening lights */}
            <div className="about-inset-temple">
              <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                <Image
                  src="/images/founder_inset_temple_hd.jpg"
                  alt="Ancient temple in Varanasi illuminated at dusk"
                  fill
                  sizes="160px"
                  quality={95}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Inset Photo 2: Lower-left Boat with sunrise flame */}
            <div className="about-inset-boat">
              <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                <Image
                  src="/images/founder_inset_boat_hd.jpg"
                  alt="Wooden boat on the Ganges at sunrise with diya flame"
                  fill
                  sizes="160px"
                  quality={95}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Main Center Portrait Card */}
            <div className="about-main-portrait-wrap">
              <div className="about-main-portrait">
                <Image
                  src="/images/founder.jpg"
                  alt="Anchal Pandey, Founder of Soil N Soul Travels"
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 450px, 400px"
                  quality={95}
                />
              </div>

              {/* Founder Name Card Overlaid on Bottom Left */}
              <div className="about-founder-badge">
                <div className="about-founder-name">Anchal Pandey</div>
                <div className="about-founder-role">
                  <span>FOUNDER · NATIVE OF BANARAS</span>
                  <span className="about-flourish-glyph">✦</span>
                </div>
              </div>
            </div>

            {/* Handwritten Note & Botanical Leaf */}
            <div className="about-founder-note-row">
              <img
                src="/images/about-ref/leaf_founder_trans.png"
                alt=""
                className="about-chinar-leaf"
                aria-hidden="true"
              />
              <span className="about-founder-script">With love, from Kashi</span>
            </div>

            {/* Vintage Circular Seal Stamp on Bottom Right */}
            <img
              src="/images/about-ref/founder_stamp_trans.png"
              alt="Seal of Founder Anchal Pandey, Native of Banaras"
              className="about-founder-stamp"
            />
          </div>

          {/* Right Column: Story Copy */}
          <div className="about-story-text-col">
            <span className="about-eyebrow about-eyebrow-dark">OUR STORY</span>
            <h2 className="about-story-heading">
              Born from the<br />
              <em>Heart of Kashi.</em>
            </h2>

            <blockquote className="about-story-quote">
              “Visitors to this sacred city deserve honesty, guidance, and care.”
            </blockquote>

            <div className="about-story-paragraphs">
              <p>
                I am a resident of Banaras, a city known for its ancient traditions,
                spiritual energy, and timeless culture.
              </p>
              <p>
                While growing up here, I often observed the challenges many tourists face
                when visiting Kashi. Many travellers come with deep faith, curiosity, and
                excitement — but unfortunately, they sometimes end up paying a lot without
                receiving genuine services or authentic experiences.
              </p>
              <p>
                Seeing this repeatedly made me realize that visitors to this sacred city
                deserve honesty, guidance, and care. That is why I decided to start Soil N Soul
                Travels.
              </p>
              <p>
                My vision is simple: to ensure that every traveler who chooses our services
                feels satisfied with every rupee they spend, and leaves Kashi with beautiful
                memories, meaningful experiences, and a sense of connection to this incredible
                city.
              </p>
              <p>
                At Soil N Soul Travels, we focus on authenticity, transparency, and heartfelt
                hospitality — so that every journey becomes truly memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. THE SOIL N SOUL WAY SECTION
      ======================================================== */}
      <section className="about-way-section" aria-label="The Soil N Soul Way">
        {/* Right background photograph: Clay diya overlooking dusk Ganges */}
        <div className="about-way-bg">
          <Image
            src="/images/about-way-diya.jpg"
            alt="Terracotta diya burning on stone ghat overlooking evening Varanasi"
            fill
            sizes="(max-width: 768px) 100vw, 65vw"
            quality={95}
          />
        </div>

        {/* Gradient Blend */}
        <div className="about-way-gradient" />

        <div className="about-way-inner">
          <div className="about-way-header">
            <div>
              <span className="about-eyebrow">THE SOIL N SOUL WAY</span>
              <h2 className="about-way-title">
                Rooted here.<br />
                Thoughtfully shared.
              </h2>
            </div>
            <p className="about-way-desc">
              Our connection to Kashi shapes every choice we make and every journey we create.
            </p>
          </div>

          {/* 4 Value Columns */}
          <div className="about-values-grid">
            {/* 01 Authenticity */}
            <div className="about-value-col">
              <span className="about-value-num">01</span>
              <div className="about-value-icon" aria-hidden="true">
                <LotusIcon />
              </div>
              <h3 className="about-value-title">Authenticity</h3>
              <p className="about-value-text">
                Genuine cultural and spiritual traditions, not spectacle.
              </p>
            </div>

            {/* 02 Sustainability */}
            <div className="about-value-col">
              <span className="about-value-num">02</span>
              <div className="about-value-icon" aria-hidden="true">
                <LeafIcon />
              </div>
              <h3 className="about-value-title">Sustainability</h3>
              <p className="about-value-text">
                Support for local artisans, heritage hotels and community-led initiatives.
              </p>
            </div>

            {/* 03 Safety & Trust */}
            <div className="about-value-col">
              <span className="about-value-num">03</span>
              <div className="about-value-icon" aria-hidden="true">
                <CommunityIcon />
              </div>
              <h3 className="about-value-title">Safety &amp; Trust</h3>
              <p className="about-value-text">
                Meticulous planning and lived local knowledge, every step of the way.
              </p>
            </div>

            {/* 04 Conscious Luxury */}
            <div className="about-value-col">
              <span className="about-value-num">04</span>
              <div className="about-value-icon" aria-hidden="true">
                <DiamondIcon />
              </div>
              <h3 className="about-value-title">Conscious Luxury</h3>
              <p className="about-value-text">
                Locally crafted excellence and the warmth of heartfelt hospitality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. OUR PHILOSOPHY SECTION
      ======================================================== */}
      <section className="about-philosophy-section" aria-label="Our Philosophy">
        <div className="about-philosophy-watermark" aria-hidden="true" />

        <div className="about-philosophy-inner">
          {/* Left Column: Heading & CTA */}
          <div className="about-philosophy-left">
            <span className="about-eyebrow about-eyebrow-dark">OUR PHILOSOPHY</span>
            <h2 className="about-philosophy-heading">
              Kashi through<br />
              Local Eyes.
            </h2>
            <p className="about-philosophy-desc">
              We believe travel is not just about places, but about people, stories, and moments
              that stay with you long after you leave.
            </p>
            <div className="about-philosophy-cta-row">
              <Link href="/journeys" className="about-hero-btn">
                <span>EXPLORE OUR JOURNEYS</span>
                <ArrowRight size={13} />
              </Link>
              <img
                src="/images/about-ref/leaf_philosophy_trans.png"
                alt=""
                className="about-philosophy-leaf"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Right Column: 3 Editorial Cards */}
          <div className="about-philosophy-cards">
            {/* Card 1: People */}
            <div className="about-philosophy-card">
              <div className="about-phil-img-wrap">
                <Image
                  src="/images/philosophy-center-arch-hd.jpg"
                  alt="People experiencing sunrise on the Ganges from an arched balcony"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 420px"
                  quality={95}
                />
              </div>
              <h3 className="about-phil-card-title">People</h3>
              <p className="about-phil-card-sub">who make Kashi alive.</p>
            </div>

            {/* Card 2: Stories */}
            <div className="about-philosophy-card">
              <div className="about-phil-img-wrap">
                <Image
                  src="/SnS/banarasi-silk-detail.webp"
                  alt="Artisan hands weaving traditional Banarasi silk on a handloom"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 420px"
                  quality={95}
                />
              </div>
              <h3 className="about-phil-card-title">Stories</h3>
              <p className="about-phil-card-sub">woven in every corner.</p>
            </div>

            {/* Card 3: Experiences */}
            <div className="about-philosophy-card">
              <div className="about-phil-img-wrap">
                <Image
                  src="/images/about-temple-dawn.jpg"
                  alt="Ancient stone temple spires at dawn along the sacred river ghats"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 420px"
                  quality={95}
                />
              </div>
              <h3 className="about-phil-card-title">Experiences</h3>
              <p className="about-phil-card-sub">that stay forever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. JOURNEY ENQUIRY & MAP SECTION
      ======================================================== */}
      <section id="contact" className="about-enquiry-section" aria-label="Design My Journey Enquiry">
        <div className="about-enquiry-bg-art" aria-hidden="true" />

        <div className="about-enquiry-inner">
          <div className="about-enquiry-header">
            <span className="about-eyebrow">DESIGN MY JOURNEY</span>
            <h2 className="about-enquiry-title">
              Every meaningful journey begins with <em>a conversation.</em>
            </h2>
            <p className="about-enquiry-sub">
              Tell us what draws you to Kashi. We’ll take care of the details that make it yours.
            </p>

            {/* Contact Row */}
            <div className="about-contact-row">
              <a href="tel:+919580417547" className="about-contact-item">
                <Phone size={14} />
                <span>+91 95804 17547</span>
              </a>
              <a href="mailto:info@soilnsoultravels.com" className="about-contact-item">
                <Mail size={14} />
                <span>info@soilnsoultravels.com</span>
              </a>
              <div className="about-contact-item">
                <MapPin size={14} />
                <span>Varanasi, Uttar Pradesh, India</span>
              </div>
            </div>
          </div>

          <div className="about-enquiry-grid">
            {/* Left: Journey Enquiry Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="about-form">
              {/* Full Name & WhatsApp Number */}
              <div className="about-form-row">
                <div className="about-form-field">
                  <label htmlFor="about-name">Full Name *</label>
                  <input
                    id="about-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    maxLength={100}
                    autoComplete="name"
                  />
                </div>
                <div className="about-form-field">
                  <label htmlFor="about-contact">WhatsApp Number *</label>
                  <input
                    id="about-contact"
                    name="contact"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                    maxLength={20}
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* Preferred Dates & Number of Guests */}
              <div className="about-form-row">
                <div className="about-form-field">
                  <label htmlFor="about-dates">Preferred Dates *</label>
                  <input
                    id="about-dates"
                    name="dates"
                    type="text"
                    placeholder="e.g. 12–14 October, or Flexible"
                    required
                    maxLength={100}
                  />
                </div>
                <div className="about-form-field">
                  <label htmlFor="about-guests">Number of Guests *</label>
                  <select id="about-guests" name="guests" defaultValue="2">
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6+">6+ Guests (Private Group)</option>
                  </select>
                </div>
              </div>

              {/* Email (optional) */}
              <div className="about-form-field">
                <label htmlFor="about-email">Email (optional)</label>
                <input
                  id="about-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  maxLength={120}
                  autoComplete="email"
                />
              </div>

              {/* Interests Checkboxes */}
              <div className="about-interests-wrap">
                <label className="about-eyebrow" style={{ color: "rgba(240, 237, 230, 0.8)", marginBottom: "4px" }}>
                  Interests
                </label>
                <div className="about-interests-grid">
                  {interestOptions.map((interest) => (
                    <label key={interest} className="about-checkbox-label">
                      <input type="checkbox" name="interests" value={interest} />
                      <span>{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="about-form-field">
                <label htmlFor="about-message">Message</label>
                <textarea
                  id="about-message"
                  name="message"
                  rows={3}
                  placeholder="A place you dream of. A moment you want to feel."
                  maxLength={1000}
                />
              </div>

              {/* Form Buttons */}
              <div className="about-form-actions">
                <button type="submit" className="about-btn-primary">
                  <span>DESIGN MY JOURNEY</span>
                  <ArrowRight size={13} />
                </button>

                <a
                  href="https://wa.me/919580417547?text=Hello%20Soil%20n%20Soul%2C%20I%20would%20love%20to%20plan%20a%20journey%20to%20Varanasi."
                  target="_blank"
                  rel="noreferrer"
                  className="about-btn-secondary"
                >
                  <WhatsAppSvg />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>

              <p className="about-form-note">
                We’ll prepare your enquiry for WhatsApp. You review and send it.
              </p>

              {submitted && whatsappLink && (
                <div style={{ marginTop: "12px", color: "var(--about-gold)", fontSize: "13px" }}>
                  Enquiry prepared! If your WhatsApp did not open automatically,{" "}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "underline", color: "#ffffff" }}
                  >
                    click here to open WhatsApp
                  </a>
                  .
                </div>
              )}
            </form>

            {/* Right: Location & Map Composite Card */}
            <div className="about-map-card">
              {/* Top Photograph */}
              <div className="about-map-top-img">
                <Image
                  src="/images/enquiry_card_top_hd.jpg"
                  alt="Sunset over the Ganges and ancient riverfront of Varanasi"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  quality={95}
                />
              </div>

              {/* Top Location Bar */}
              <div className="about-map-top-caption">
                <MapPin size={18} color="#b8860b" />
                <div className="about-map-caption-text">
                  <strong>Varanasi, Uttar Pradesh, India</strong>
                  <small>Our home. Your beginning.</small>
                </div>
              </div>

              {/* Interactive Google Map of Varanasi */}
              <div className="about-map-frame">
                <iframe
                  title="Interactive Map of Varanasi, Uttar Pradesh, India"
                  src="https://maps.google.com/maps?q=Varanasi%2C%20Uttar%20Pradesh%2C%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Bottom Dark Location Banner */}
              <div className="about-map-bottom-banner">
                <div className="about-map-art-watermark" aria-hidden="true" />
                <p>OUR HOME. YOUR BEGINNING.</p>
                <h4>Varanasi, India</h4>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Varanasi%2C+Uttar+Pradesh%2C+India"
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore the map →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ========================================================
   SVG ICONS (MATCHING REFERENCE EXACTLY)
======================================================== */
function LotusIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
      {/* Central petal */}
      <path d="M20 7C20 7 24 16 24 23C24 27 22.5 30 20 31C17.5 30 16 27 16 23C16 16 20 7 20 7Z" />
      {/* Inner left petal */}
      <path d="M18 13C18 13 11 18 11 25C11 28 13 30 16 30C18 30 19 28 19 28" />
      {/* Inner right petal */}
      <path d="M22 13C22 13 29 18 29 25C29 28 27 30 24 30C22 30 21 28 21 28" />
      {/* Outer left petal */}
      <path d="M14 20C14 20 6 22 6 27C6 30 10 32 14 31" />
      {/* Outer right petal */}
      <path d="M26 20C26 20 34 22 34 27C34 30 30 32 26 31" />
      {/* Base line */}
      <path d="M12 32C16 34 24 34 28 32" strokeLinecap="round" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
      {/* Leaf outline tilted */}
      <path d="M12 28C12 28 10 14 22 10C34 6 32 24 26 28C20 32 12 28 12 28Z" strokeLinejoin="round" />
      {/* Central vein */}
      <path d="M12 28C16 24 22 18 28 12" />
      {/* Branch veins */}
      <path d="M18 22C21 21 24 22 24 22" />
      <path d="M20 18C18 16 16 16 16 16" />
      <path d="M23 15C25 15 28 17 28 17" />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
      {/* Center Person */}
      <circle cx="20" cy="14" r="4.5" />
      <path d="M13 29C13 24 16 22 20 22C24 22 27 24 27 29" strokeLinecap="round" />
      {/* Left Person */}
      <circle cx="11" cy="17" r="3.5" />
      <path d="M5 30C5 26.5 7.5 25 11 25C12.5 25 13.8 25.5 14.5 26.5" strokeLinecap="round" />
      {/* Right Person */}
      <circle cx="29" cy="17" r="3.5" />
      <path d="M35 30C35 26.5 32.5 25 29 25C27.5 25 26.2 25.5 25.5 26.5" strokeLinecap="round" />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4">
      {/* Diamond facet outline */}
      <polygon points="12,14 28,14 34,20 20,32 6,20" strokeLinejoin="round" />
      {/* Top facets */}
      <polyline points="6,20 15,20 20,32" strokeLinejoin="round" />
      <polyline points="34,20 25,20 20,32" strokeLinejoin="round" />
      <line x1="12" y1="14" x2="15" y2="20" />
      <line x1="28" y1="14" x2="25" y2="20" />
      <line x1="20" y1="14" x2="15" y2="20" />
      <line x1="20" y1="14" x2="25" y2="20" />
    </svg>
  );
}

function WhatsAppSvg() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
