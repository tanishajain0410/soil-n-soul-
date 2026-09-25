"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Compass,
  HeartHandshake,
  Menu,
  Phone,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import JourneyEnquiry from "@/components/JourneyEnquiry";
import LuxuryNavbar from "@/components/LuxuryNavbar";

const experiences = [
  {
    title: "Private Sunrise Boat Experience",
    copy: "A serene start to your day on the sacred Ganges.",
    image: "/SnS/the-sacred-morning.png",
    alt: "Sunrise over Varanasi from a private boat on the Ganges",
  },
  {
    title: "Ganga Aarti (Private Access)",
    copy: "Witness the divine ritual from exclusive vantage points.",
    image: "/SnS/sacred-kashi.png",
    alt: "The evening Ganga Aarti ceremony at Dashashwamedh Ghat",
  },
  {
    title: "Heritage Walks Through Old Varanasi",
    copy: "Explore hidden lanes, ancient temples and living traditions.",
    image: "/SnS/varanasi-heritage.png",
    alt: "Historic architecture and lanes in old Varanasi",
  },
  {
    title: "Local Food Trails",
    copy: "Taste authentic Varanasi through curated culinary journeys.",
    image: "/SnS/the-banarasi-table.png",
    alt: "Traditional Banarasi food served for a shared meal",
  },
];

const philosophyFeatures = [
  { icon: Sparkles, title: "Authentic Experiences" },
  { icon: BedDouble, title: "Handpicked Stays" },
  { icon: HeartHandshake, title: "Local Connections" },
  { icon: Compass, title: "Personalized Itineraries" },
];

const navItems = [
  ["Home", "/"],
  ["Experiences", "/experiences"],
  ["Stays", "/#stays"],
  ["Our Story", "/about"],
  ["Gallery", "/#gallery"],
  ["Contact", "/#contact"],
];

export default function HomeClient() {
  const [filmOpen, setFilmOpen] = useState(false);

  return (
    <div className="reference-homepage">
      {/* ========================================================
          HEADER / NAVIGATION (MATCHES EXPERIENCES NAVBAR EXACTLY)
      ======================================================== */}
      <LuxuryNavbar />

      {/* ========================================================
          SECTION 01: FULL-SCREEN HERO
      ======================================================== */}
      <section className="hero-reference-section" id="home" aria-label="Varanasi, A Feeling Beyond Time">
        {/* Cinematic Sunset/Twilight Ganges Background Image - Desktop (3:2) & Mobile (9:16) */}
        <Image
          src="/SnS/the-sacred-morning.png"
          alt="Sunset over the Ganges and ancient riverfront ghats of Varanasi"
          fill
          priority
          sizes="(max-width: 768px) 1px, 100vw"
          quality={90}
          className="hero-cinematic-bg hero-cinematic-desktop"
        />
        <Image
          src="/SnS/the-sacred-morning-mobile.jpg"
          alt="Sacred morning over the Ganges and ancient riverfront ghats of Varanasi"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1px"
          quality={90}
          className="hero-cinematic-bg hero-cinematic-mobile"
        />

        {/* Cinematic Dark Gradient Overlay */}
        <div className="hero-cinematic-overlay" />

        {/* Hero Left Content */}
        <div className="hero-content-block">
          <p className="hero-eyebrow-text">
            <span>SPIRITUAL</span>
            <span className="eyebrow-dot">•</span>
            <span>CULTURAL</span>
            <span className="eyebrow-dot">•</span>
            <span>TIMELESS</span>
          </p>

          <h1 className="hero-main-heading">
            <span className="hero-city-title">VARANASI</span>
            <em className="hero-feeling-title">A Feeling</em>
            <span className="hero-time-title">Beyond Time</span>
          </h1>

          <p className="hero-support-description">
            Curated experiences, soulful stays and deeply personal journeys in
            the world&apos;s oldest living city.
          </p>

          <div className="hero-cta-group">
            <a href="#contact" className="hero-primary-btn">
              <span>PLAN YOUR VARANASI JOURNEY</span>
              <ArrowRight size={14} />
            </a>

            <button
              className="hero-watch-btn"
              onClick={() => setFilmOpen(true)}
              aria-label="Watch Film"
            >
              <span className="watch-film-circle">
                <Play size={11} fill="currentColor" />
              </span>
              <span>Watch Film</span>
            </button>
          </div>
        </div>

        {/* Bottom Feature Strip & Scroll Indicator */}
        <div className="hero-bottom-strip">
          <div className="hero-strip-items">
            <div className="hero-strip-item">
              <Sparkles size={17} className="hero-strip-icon" />
              <span>PRIVATE EXPERIENCES</span>
            </div>
            <div className="hero-strip-item">
              <BedDouble size={17} className="hero-strip-icon" />
              <span>HANDPICKED STAYS</span>
            </div>
            <div className="hero-strip-item">
              <HeartHandshake size={17} className="hero-strip-icon" />
              <span>LOCAL CONNECTIONS</span>
            </div>
            <div className="hero-strip-item">
              <Users size={17} className="hero-strip-icon" />
              <span>PERSONAL CONCIERGE</span>
            </div>
          </div>

          <div className="hero-scroll-wrapper">
            <a href="#philosophy" className="hero-scroll-btn" aria-label="Scroll to explore">
              <span className="scroll-text">SCROLL</span>
              <ArrowDown size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 02: SOIL N SOUL PHILOSOPHY
      ======================================================== */}
      <section className="philosophy-reference-section" id="philosophy">
        <div className="philosophy-container">
          <div className="philosophy-three-zones">
            {/* Zone 1: Left Copy & Badges */}
            <div className="philosophy-zone-left">
              <p className="reference-gold-eyebrow">THE SOIL N SOUL PHILOSOPHY</p>
              <h2 className="philosophy-heading">
                More than a destination,<br />
                <em>a deeper connection.</em>
              </h2>
              <p className="philosophy-paragraph">
                We create immersive Varanasi experiences that go beyond
                sightseeing — connecting you with the city, its people, its
                traditions and its timeless spirit.
              </p>
              <Link href="/about" className="philosophy-story-btn">
                <span>Our Story</span>
                <ArrowRight size={13} />
              </Link>

              {/* 4 Feature Items directly under Left Copy */}
              <div className="philosophy-bottom-badges">
                {philosophyFeatures.map(({ icon: Icon, title }) => (
                  <div className="philosophy-badge-item" key={title}>
                    <div className="badge-icon-circle">
                      <Icon size={16} strokeWidth={1.4} />
                    </div>
                    <span className="badge-title">{title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone 2: Center Carved Stone Arch Photo */}
            <div className="philosophy-zone-center">
              <div className="philosophy-photo-card">
                <Image
                  src="/SnS/private-ganga-experience.webp"
                  alt="A private boat gliding across the Ganges at sunset, with Varanasi's ghats beyond"
                  fill
                  sizes="(max-width: 900px) 90vw, 36vw"
                  className="philosophy-photo-img"
                  quality={90}
                  priority
                />
              </div>
            </div>

            {/* Zone 3: Right Quote with Architectural Sketch */}
            <div className="philosophy-zone-right">
              <div className="philosophy-quote-box">
                <span className="quote-mark-large" aria-hidden="true">“</span>
                <blockquote className="philosophy-quote-text">
                  Varanasi is not just<br />
                  a place you visit,<br />
                  it is a feeling you<br />
                  carry with you.
                </blockquote>
                <div className="quote-gold-divider" />
              </div>
              <div className="temple-drawing-bg" aria-hidden="true">
                <img
                  src="/images/temple-illustration.png"
                  alt=""
                  className="temple-sketch-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 03: SIGNATURE EXPERIENCES
      ======================================================== */}
      <section className="experiences-reference-section" id="experiences">
        <div className="experiences-container">
          {/* Header Row */}
          <div className="experiences-header-row">
            <div className="experiences-header-left">
              <p className="reference-gold-eyebrow">SIGNATURE EXPERIENCES</p>
              <h2 className="experiences-heading">
                Curated Experiences<br />
                That Stay With You Forever.
              </h2>
            </div>

            <div className="experiences-header-center">
              <p className="experiences-intro-copy">
                From serene boat rides to private temple rituals, from local
                cuisine to artisan walks — each experience is thoughtfully
                designed to reveal the real Varanasi.
              </p>
            </div>

            <div className="experiences-header-right">
              <Link href="/experiences" className="explore-all-link">
                <span>Explore All Experiences</span>
                <ArrowRight size={13} />
              </Link>
              <div className="carousel-nav-arrows">
                <button
                  type="button"
                  className="arrow-circle-btn"
                  aria-label="Previous experiences"
                  onClick={() => {
                    const el = document.getElementById("exp-cards-row");
                    if (el) el.scrollBy({ left: -320, behavior: "smooth" });
                  }}
                >
                  <ArrowLeft size={14} />
                </button>
                <button
                  type="button"
                  className="arrow-circle-btn"
                  aria-label="Next experiences"
                  onClick={() => {
                    const el = document.getElementById("exp-cards-row");
                    if (el) el.scrollBy({ left: 320, behavior: "smooth" });
                  }}
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* 4 Large Tall Cinematic Cards */}
          <div className="experience-cards-grid" id="exp-cards-row">
            {experiences.map((exp) => (
              <Link
                href="/experiences"
                className="experience-cinematic-card"
                key={exp.title}
              >
                <div className="card-image-wrap">
                  <Image
                    src={exp.image}
                    alt={exp.alt}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 24vw"
                    className="card-photo"
                    quality={90}
                  />
                  <div className="card-gradient-shade" />

                  <div className="card-content-overlay">
                    <h3 className="card-title">{exp.title}</h3>
                    <p className="card-description">{exp.copy}</p>
                  </div>

                  <div className="card-arrow-circle" aria-hidden="true">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 04: HANDPICKED STAYS
      ======================================================== */}
      <section className="stays-reference-section" id="stays">
        <div className="stays-container">
          <div className="stays-editorial-grid">
            {/* Left: Large Luxury Heritage Stay Photo */}
            <div className="stay-left-feature">
              <div className="stay-large-image-frame">
                <Image
                  src="/SnS/private-journey-stays.webp"
                  alt="Luxury heritage stay in Varanasi overlooking the Ganges"
                  fill
                  sizes="(max-width: 900px) 100vw, 42vw"
                  className="stay-large-photo"
                  quality={90}
                />
              </div>
            </div>

            {/* Center: Cream Editorial Content Panel */}
            <div className="stay-center-panel">
              <p className="reference-gold-eyebrow">STAY IN TIMELESS LUXURY</p>
              <h2 className="stay-panel-heading">
                Handpicked stays<br />
                with soulful views.
              </h2>
              <p className="stay-panel-description">
                From heritage properties on the ghats to boutique stays in the
                old city, we curate accommodations that add meaning to your
                Varanasi experience.
              </p>
              <Link href="/services/stay" className="stay-explore-btn">
                <span>Explore Stays</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Right: Three Visual Tiles */}
            <div className="stay-right-tiles">
              {/* Tile 1 (Top, wider): Heritage Havelis */}
              <Link href="/services/stay" className="stay-tile stay-tile-top">
                <Image
                  src="/SnS/rare-access-heritage-home.webp"
                  alt="Heritage Havelis in Varanasi"
                  fill
                  sizes="(max-width: 900px) 100vw, 28vw"
                  className="tile-photo"
                  quality={90}
                />
                <div className="tile-overlay-shade" />
                <span className="tile-label">Heritage Havelis</span>
              </Link>

              {/* Bottom Row: 2 tiles side by side */}
              <div className="stay-tile-bottom-row">
                {/* Tile 2: Boutique Stays */}
                <Link href="/services/stay" className="stay-tile stay-tile-bottom">
                  <Image
                    src="/SnS/private-journey-stays.webp"
                    alt="Boutique Stays in Varanasi"
                    fill
                    sizes="(max-width: 900px) 50vw, 14vw"
                    className="tile-photo"
                    quality={90}
                  />
                  <div className="tile-overlay-shade" />
                  <span className="tile-label">Boutique Stays</span>
                </Link>

                {/* Tile 3: Riverside Villas */}
                <Link href="/services/stay" className="stay-tile stay-tile-bottom">
                  <Image
                    src="/SnS/kashi-after-dark.png"
                    alt="Riverside Villas in Varanasi"
                    fill
                    sizes="(max-width: 900px) 50vw, 14vw"
                    className="tile-photo"
                    quality={90}
                  />
                  <div className="tile-overlay-shade" />
                  <span className="tile-label">Riverside Villas</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 05: PREMIUM SERVICE / TRUST STRIP
      ======================================================== */}
      <section className="trust-strip-reference" aria-label="Premium Services">
        <div className="trust-strip-container">
          <div className="trust-item">
            <span className="trust-num">01</span>
            <div className="trust-text">
              <strong className="trust-title">Private experiences</strong>
              <small className="trust-copy">
                Thoughtfully designed, one-of-a-kind journeys
              </small>
            </div>
          </div>

          <div className="trust-item">
            <span className="trust-num">02</span>
            <div className="trust-text">
              <strong className="trust-title">Local knowledge</strong>
              <small className="trust-copy">Meet the real Varanasi</small>
            </div>
          </div>

          <div className="trust-item">
            <span className="trust-num">03</span>
            <div className="trust-text">
              <strong className="trust-title">Personal concierge</strong>
              <small className="trust-copy">Care at every step</small>
            </div>
          </div>

          <div className="trust-item">
            <span className="trust-num">04</span>
            <div className="trust-text">
              <strong className="trust-title">Seamless planning</strong>
              <small className="trust-copy">For a truly effortless experience</small>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 06: FINAL CINEMATIC CTA
      ======================================================== */}
      <section className="cta-cinematic-reference" id="cta">
        {/* High-resolution sunset over the Ganges and Varanasi ghats */}
        <Image
          src="/images/about-hero-sunset.jpg"
          alt="Sunset over the Ganges and illuminated Varanasi ghats"
          fill
          sizes="100vw"
          quality={90}
          className="cta-cinematic-bg"
        />
        <div className="cta-cinematic-overlay" aria-hidden="true" />

        <div className="cta-container">
          {/* Left: Heading and Actions */}
          <div className="cta-left-col">
            <p className="cta-gold-eyebrow">READY TO EXPERIENCE</p>
            <h2 className="cta-large-heading">
              YOUR VARANASI<br />
              STORY?
            </h2>
            <p className="cta-subtitle">
              Let our travel experts design a personalized journey for you.
            </p>

            <div className="cta-buttons-row">
              <a href="#contact" className="cta-primary-btn">
                <span>Plan Your Journey</span>
                <ArrowRight size={13} />
              </a>

              <a
                href="https://wa.me/919580417547?text=Hello%20Soil%20n%20Soul%2C%20I%20would%20love%20to%20speak%20with%20your%20team."
                target="_blank"
                rel="noreferrer"
                className="cta-speak-btn"
              >
                <WhatsAppNavIcon />
                <span>Speak to Our Team</span>
              </a>
            </div>
          </div>

          {/* Right: 4 Feature Points with Gold Round Icons */}
          <div className="cta-right-col">
            <div className="cta-feature-item">
              <div className="cta-feature-icon-circle">
                <Compass size={14} strokeWidth={1.5} />
              </div>
              <span className="cta-feature-label">Custom Itineraries</span>
            </div>

            <div className="cta-feature-item">
              <div className="cta-feature-icon-circle">
                <Users size={14} strokeWidth={1.5} />
              </div>
              <span className="cta-feature-label">Dedicated Travel Experts</span>
            </div>

            <div className="cta-feature-item">
              <div className="cta-feature-icon-circle">
                <ShieldCheck size={14} strokeWidth={1.5} />
              </div>
              <span className="cta-feature-label">Seamless Planning</span>
            </div>

            <div className="cta-feature-item">
              <div className="cta-feature-icon-circle">
                <HeartHandshake size={14} strokeWidth={1.5} />
              </div>
              <span className="cta-feature-label">
                Thoughtful &amp; Responsible Travel
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 07: JOURNEY ENQUIRY FORM
      ======================================================== */}
      <JourneyEnquiry />

      {/* ========================================================
          CINEMATIC FILM MODAL
      ======================================================== */}
      {filmOpen && (
        <div
          className="film-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Varanasi Film"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setFilmOpen(false);
          }}
        >
          <div className="film-modal-dialog">
            <button
              className="film-modal-close-btn"
              onClick={() => setFilmOpen(false)}
              aria-label="Close Film"
            >
              <X size={20} />
            </button>
            <video
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster="/SnS/when-the-city-glows.webp"
              className="film-video-player"
            >
              <source src="/kashi-hero.mp4" type="video/mp4" />
              Your browser does not support embedded video.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

function WhatsAppNavIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.2 11.7a8.2 8.2 0 0 1-12.1 7.2L3 20l1.2-4.8a8.2 8.2 0 1 1 16-3.5Z" />
      <path d="M8.5 8.4c.3 2.2 2.4 4.4 4.8 5.2l1.3-1.1 2 .9c.2.1.3.3.2.5-.3 1.1-1.2 1.6-2.3 1.6-3.7-.2-7.7-4-7.8-7.6 0-1.1.6-1.9 1.6-2.2.2-.1.4 0 .5.2l.8 2-1.1.5Z" />
    </svg>
  );
}

function TempleArchitecturalArt() {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="architectural-svg"
    >
      <g stroke="#b89358" strokeWidth="0.85" strokeOpacity="0.45">
        <path d="M40 310V220h15v-25h12v-20h18v-32h18V95h11V78h8V56h8V35h7V18h6V8h3v10h7v17h8v21h8v22h8v28h15v35h14v25h17v20h16v115" />
        <path d="M120 310v-70h42v70M126 240v-32h30v32m-27-32 12-16 14 16m-33 80h42M30 310h260M60 258h34m120 0h40m-87 52v-45m-14 0v45m28-45v45" />
        <path d="m35 192 28-22 15 7 22-30 16 7 15-21 22 8 21-23 18 9 22-19 22 14 24-6" />
        <path d="M55 200h210M42 220h240M62 170h54m-36-30h45m12-25h75m-60-26h37m-22-30h20" />
      </g>
      <path
        d="M142 8h6v22h-6zM139 20h12"
        stroke="#b89358"
        strokeWidth="0.85"
        strokeOpacity="0.5"
      />
    </svg>
  );
}
