"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JourneyEnquiry from "@/components/JourneyEnquiry";

export default function AboutClient() {
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

      <section className="about-kashi-gallery" aria-labelledby="about-gallery-heading">
        <div className="about-kashi-gallery-head">
          <div>
            <span className="about-eyebrow">A GLIMPSE OF OUR KASHI</span>
            <h2 id="about-gallery-heading">Moments that<br/><em>inspire us.</em></h2>
          </div>
          <Link href="/experiences" className="about-gallery-link">View experiences <ArrowRight size={14}/></Link>
        </div>
        <div className="about-kashi-gallery-grid">
          {[
            ["/SnS/the-sacred-morning.webp", "First light on the Ganga"],
            ["/SnS/sacred-kashi.webp", "The evening aarti"],
            ["/SnS/varanasi-heritage.webp", "An old lane in Kashi"],
            ["/SnS/ganga-boat.webp", "Along the ghats"],
            ["/images/about-temple-dawn.jpg", "Temple spires at dawn"],
          ].map(([src, alt]) => (
            <div className="about-kashi-gallery-image" key={src}>
              <Image src={src} alt={alt} fill sizes="(max-width: 640px) 82vw, (max-width: 960px) 40vw, 20vw" />
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          6. JOURNEY ENQUIRY & MAP SECTION
      ======================================================== */}
      <JourneyEnquiry variant="default" />

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
