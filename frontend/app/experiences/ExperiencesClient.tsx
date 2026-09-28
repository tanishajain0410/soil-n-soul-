"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Users,
  UserCheck,
  Landmark,
  Camera,
  Utensils,
  PartyPopper,
  Flame,
} from "lucide-react";
import JourneyEnquiry from "@/components/JourneyEnquiry";
import { journeyCategories } from "@/data/journeyCategories";
function WhatsAppIcon() {
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

export default function ExperiencesClient() {
  const testimonials = [
    journeyCategories.dharm.testimonial,
    journeyCategories.arth.testimonial,
    journeyCategories.kaam.testimonial,
  ];

  return (
    <div className="exp-page-root">

      {/* ========================================================
          2. FULL-SCREEN EXPERIENCE HERO
      ======================================================== */}
      <section className="exp-hero-section">
        <Image
          src="/SnS/the-sacred-morning.webp"
          alt="Golden sunset over Varanasi Ganges river with illuminated temple skyline"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="exp-hero-bg"
        />
        <div className="exp-hero-overlay" />

        <div className="exp-hero-content">
          <p className="exp-gold-eyebrow">EXPERIENCES • CULTURE • SPIRITUAL</p>
          <h1 className="exp-hero-heading">
            Experiences,<br />
            <span className="exp-hero-italic">Curated Around You.</span>
          </h1>
          <p className="exp-hero-desc">
            From sacred rituals to vibrant local traditions, discover handpicked
            experiences that connect you with the real Varanasi — its people,
            its stories and its timeless spirit.
          </p>
          <a href="#enquiry" className="exp-hero-btn">
            <span>Explore Experiences</span>
            <ArrowRight size={14} />
          </a>
          <a href="#enquiry" className="exp-watch-story"><span>▶</span> WATCH OUR STORY</a>
        </div>
      </section>

      {/* ========================================================
          3. INTRODUCTION / PHILOSOPHY (CREAM SECTION)
      ======================================================== */}
      <section className="exp-intro-section">
        <div className="exp-intro-container">
          <div>
            <p className="exp-gold-eyebrow" style={{ color: "#cca462" }}>
              OUR APPROACH
            </p>
            <h2 className="exp-intro-heading">
              A Deeper<br />
              Connection to Varanasi.
            </h2>
          </div>

          <div className="exp-intro-desc-wrap">
            <p className="exp-intro-desc">
              Every experience is thoughtfully designed to go beyond sightseeing —
              to help you connect with the city, its people, its culture and its
              living traditions.
            </p>
            <div className="exp-intro-divider" />
          </div>

          <div className="exp-approach-image">
            <Image src="/SnS/the-sacred-morning.webp" alt="A quiet moment on the Ganga in Varanasi" fill sizes="(max-width: 700px) 80vw, 250px" quality={88} />
            <div className="exp-approach-inset"><Image src="/SnS/the-banarasi-table.webp" alt="A taste of local life in Kashi" fill sizes="110px" /></div>
          </div>
          <blockquote className="exp-approach-quote">“It’s not just what<br />you do in Varanasi,<br />but how it makes<br /><em>you feel.</em>”</blockquote>
          <div className="exp-approach-features"><span>Curated Experiences</span><span>Local Connections</span><span>Authentic Encounters</span><span>Personalised Itineraries</span></div>
        </div>

        {/* Subtle temple background line art */}
        <img
          src="/images/temple-sketch-right.png"
          alt=""
          aria-hidden="true"
          className="exp-intro-temple-bg"
        />
      </section>

      {/* ========================================================
          4. EXPERIENCE 01 — SACRED KASHI (DARK SECTION)
      ======================================================== */}
      <section id="sacred-kashi" className="exp-split-section exp-split-dark">
        <div className="exp-split-container">
          {/* Left: Large Photo */}
          <div className="exp-image-col">
            <div className="exp-main-image-wrap">
              <Image
                src="/SnS/sacred-kashi.webp"
                alt="Priest performing the sacred evening Ganga Aarti with tiered fire lamp in Varanasi"
                fill
                sizes="(max-width: 980px) 100vw, 55vw"
                quality={90}
                className="exp-main-image"
              />
            </div>
            {/* Inset Secondary Photo */}
            <div className="exp-inset-card exp-inset-right">
              <Image
                src="/SnS/the-sacred-morning.webp"
                alt="Woman in red sari overlooking the sacred river through a carved stone temple arch"
                fill
                sizes="(max-width: 640px) 90px, (max-width: 980px) 120px, 190px"
                quality={90}
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Editorial Content */}
          <div className="exp-content-col">
            <div className="exp-number-tag">01</div>
            <p className="exp-category-tag">SPIRITUAL EXPERIENCES</p>
            <h2 className="exp-title">Sacred Kashi</h2>
            <p className="exp-description">
              Step into the spiritual heart of India with private temple visits,
              Ganga Aarti experiences, rituals and soulful moments on the ghats.
            </p>

            <div className="exp-bullets-list">
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Landmark size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">Private Temple Access</span>
              </div>
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Flame size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">
                  Ganga Aarti (Exclusive View)
                </span>
              </div>
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Sparkles size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">
                  Spiritual Walks &amp; Rituals
                </span>
              </div>
            </div>

            <a href="#enquiry" className="exp-circle-cta">
              <span className="exp-circle-arrow">
                <ArrowRight size={14} />
              </span>
              <span>Design Your Journey</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. EXPERIENCE 02 — LIVING BANARAS (CREAM SECTION)
      ======================================================== */}
      <section id="living-banaras" className="exp-split-section exp-split-cream">
        <div className="exp-split-container exp-split-reverse">
          {/* Left: Editorial Content */}
          <div className="exp-content-col">
            <div className="exp-number-tag">02</div>
            <p className="exp-category-tag">CULTURAL EXPERIENCES</p>
            <h2 className="exp-title">Living Banaras</h2>
            <p className="exp-description">
              Walk through ancient lanes, meet local artisans, explore traditional
              crafts, and experience the living culture and daily life of Varanasi.
            </p>

            <div className="exp-bullets-list">
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Compass size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">Heritage Walks</span>
              </div>
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Sparkles size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">
                  Artisans &amp; Craft Traditions
                </span>
              </div>
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Users size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">
                  Local Life &amp; Hidden Stories
                </span>
              </div>
            </div>

            <a href="#enquiry" className="exp-circle-cta">
              <span className="exp-circle-arrow exp-circle-arrow-light">
                <ArrowRight size={14} />
              </span>
              <span>Design Your Journey</span>
            </a>
          </div>

          {/* Right: Large Photo */}
          <div className="exp-image-col">
            <div className="exp-main-image-wrap">
              <Image
                src="/SnS/the-hands-of-banaras.webp"
                alt="A Banarasi artisan shaping a traditional craft beside the Ganges"
                fill
                sizes="(max-width: 980px) 100vw, 55vw"
                quality={90}
                className="exp-main-image"
              />
              {/* Handwritten Script Accent */}
              <span className="exp-handwritten-script exp-script-overlay-bottom">
                Stories of Banaras
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. EXPERIENCE 03 — TASTE OF KASHI (DARK SECTION)
      ======================================================== */}
      <section id="taste-of-kashi" className="exp-split-section exp-split-dark">
        <div className="exp-split-container">
          {/* Left: Large Photo with Inset Chai */}
          <div className="exp-image-col">
            <div className="exp-main-image-wrap">
              <Image
                src="/SnS/the-banarasi-table.webp"
                alt="Traditional Banarasi street food and flavorful chaat prepared in polished brass vessels"
                fill
                sizes="(max-width: 980px) 100vw, 55vw"
                quality={90}
                className="exp-main-image"
              />
            </div>
            {/* Inset Secondary Photo: Kulhad Chai */}
            <div className="exp-inset-card exp-inset-right">
              <Image
                src="/SnS/malaiyo-kashi.webp"
                alt="Steaming fresh spiced Banarasi masala chai served in an authentic earthen clay kulhad cup"
                fill
                sizes="(max-width: 640px) 90px, (max-width: 980px) 120px, 190px"
                quality={90}
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Editorial Content */}
          <div className="exp-content-col" style={{ position: "relative" }}>
            <div className="exp-number-tag">03</div>
            <p className="exp-category-tag">CULINARY EXPERIENCES</p>
            <h2 className="exp-title">Taste of Kashi</h2>
            <p className="exp-description">
              Savor the authentic flavors of Varanasi — from iconic street food
              to traditional home-cooked meals curated with local experts.
            </p>

            <div className="exp-bullets-list">
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Utensils size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">Curated Food Trails</span>
              </div>
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Sparkles size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">Traditional Cuisine</span>
              </div>
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Users size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">Meet Local Food Experts</span>
              </div>
            </div>

            <a href="#enquiry" className="exp-circle-cta">
              <span className="exp-circle-arrow">
                <ArrowRight size={14} />
              </span>
              <span>Design Your Journey</span>
            </a>

            {/* Decorative Calligraphy */}
            <div className="exp-handwritten-script exp-script-side">
              Flavors<br />
              People<br />
              Stories
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. EXPERIENCE 04 — HIDDEN BANARAS (CREAM SECTION)
      ======================================================== */}
      <section id="hidden-banaras" className="exp-split-section exp-split-cream">
        <div className="exp-split-container exp-split-reverse">
          {/* Left: Editorial Content */}
          <div className="exp-content-col">
            <div className="exp-number-tag">04</div>
            <p className="exp-category-tag">OFFBEAT EXPERIENCES</p>
            <h2 className="exp-title">Hidden Banaras</h2>
            <p className="exp-description">
              Venture beyond the usual and discover a lesser-seen side of the city
              — quiet temples, secret lanes, centuries-old havelis and soulful
              corners known only to locals.
            </p>

            <div className="exp-bullets-list">
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Landmark size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">Offbeat Temples</span>
              </div>
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Compass size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">Hidden Lanes</span>
              </div>
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Sparkles size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">Untold Stories</span>
              </div>
            </div>

            <a href="#enquiry" className="exp-circle-cta">
              <span className="exp-circle-arrow exp-circle-arrow-light">
                <ArrowRight size={14} />
              </span>
              <span>Design Your Journey</span>
            </a>
          </div>

          {/* Right: Large Photo with Inset Heritage Lane */}
          <div className="exp-image-col">
            <div className="exp-main-image-wrap">
              <Image
                src="/images/hero/hero-3.jpg"
                alt="Sunlit riverfront ghats of Varanasi lined with ancient stone palaces and resting wooden boats"
                fill
                sizes="(max-width: 980px) 100vw, 55vw"
                quality={90}
                className="exp-main-image"
              />
            </div>
            {/* Inset Secondary Photo: Historic Lane */}
            <div className="exp-inset-card exp-inset-top-right">
              <Image
                src="/SnS/varanasi-heritage.webp"
                alt="Atmospheric narrow alleyway of Old Varanasi with golden sunlight streaming down onto a resting bicycle"
                fill
                sizes="(max-width: 640px) 90px, (max-width: 980px) 120px, 180px"
                quality={90}
                className="object-cover"
              />
            </div>
            <div className="exp-script-under-inset">
              <span className="exp-handwritten-script">Beyond the Obvious</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. EXPERIENCE 05 — CELEBRATIONS (DARK SECTION)
      ======================================================== */}
      <section id="celebrations" className="exp-split-section exp-split-dark">
        <div className="exp-split-container">
          {/* Left: Large Photo with Inset Diya */}
          <div className="exp-image-col">
            <div className="exp-main-image-wrap">
              <Image
                src="/SnS/celebrations.jpg"
                alt="Varanasi riverfront illuminated with thousands of festival flames and lamps during Dev Deepawali celebration"
                fill
                sizes="(max-width: 980px) 100vw, 55vw"
                quality={90}
                className="exp-main-image"
              />
            </div>
            {/* Inset Secondary Photo: Diya Flame */}
            <div className="exp-inset-card exp-inset-right">
              <Image
                src="/SnS/private-journey-rituals.webp"
                alt="Devout hands lighting a brass diya lamp with glowing sacred flame and fresh marigold flowers"
                fill
                sizes="(max-width: 640px) 90px, (max-width: 980px) 120px, 190px"
                quality={90}
                className="object-cover"
              />
            </div>
          </div>

          {/* Right: Editorial Content */}
          <div className="exp-content-col" style={{ position: "relative" }}>
            <div className="exp-number-tag">05</div>
            <p className="exp-category-tag">SPECIAL EXPERIENCES</p>
            <h2 className="exp-title">Celebrations</h2>
            <p className="exp-description">
              Be a part of Varanasi&apos;s most beautiful festivals, special rituals
              and cultural celebrations, designed for an intimate and meaningful
              experience.
            </p>

            <div className="exp-bullets-list">
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <PartyPopper size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">Festivals &amp; Ceremonies</span>
              </div>
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Sparkles size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">Custom Celebrations</span>
              </div>
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Flame size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">Unique Cultural Access</span>
              </div>
            </div>

            <a href="#enquiry" className="exp-circle-cta">
              <span className="exp-circle-arrow">
                <ArrowRight size={14} />
              </span>
              <span>Design Your Journey</span>
            </a>

            {/* Decorative Calligraphy */}
            <div className="exp-handwritten-script exp-script-side">
              Festivals<br />
              Rituals<br />
              Moments
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          9. EXPERIENCE 06 — KASHI THROUGH YOUR LENS (CREAM SECTION)
      ======================================================== */}
      <section
        id="kashi-through-your-lens"
        className="exp-split-section exp-split-cream"
      >
        <div className="exp-split-container exp-split-reverse">
          {/* Left: Editorial Content */}
          <div className="exp-content-col">
            <div className="exp-number-tag">06</div>
            <p className="exp-category-tag">CREATIVE EXPERIENCES</p>
            <h2 className="exp-title">Kashi Through Your Lens</h2>
            <p className="exp-description">
              Capture the many moods of Varanasi with guided photography
              experiences — from golden sunrises to soulful nightscapes.
            </p>

            <div className="exp-bullets-list">
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Camera size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">Photography Walks</span>
              </div>
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Compass size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">
                  Iconic &amp; Hidden Locations
                </span>
              </div>
              <div className="exp-bullet-item">
                <div className="exp-bullet-icon">
                  <Users size={12} strokeWidth={1.5} />
                </div>
                <span className="exp-bullet-label">
                  Guidance from Local Experts
                </span>
              </div>
            </div>

            <a href="#enquiry" className="exp-circle-cta">
              <span className="exp-circle-arrow exp-circle-arrow-light">
                <ArrowRight size={14} />
              </span>
              <span>Design Your Journey</span>
            </a>
          </div>

          {/* Right: Large Photo with Inset Boat Sunrise */}
          <div className="exp-image-col">
            <div className="exp-main-image-wrap">
              <Image
                src="/SnS/kashi-through-your-lens.webp"
                alt="Woman photographer on wooden boat with camera framed against the golden sunset over the Ganga"
                fill
                sizes="(max-width: 980px) 100vw, 55vw"
                quality={90}
                className="exp-main-image"
              />
            </div>
            {/* Inset Secondary Photo: Sunrise Boatman */}
            <div className="exp-inset-card exp-inset-overlap">
              <Image
                src="/images/experiences/sunrise-boatman-inset.webp"
                alt="Silhouette of a solitary boatman rowing his wooden boat into the brilliant orange morning sunrise over Varanasi"
                fill
                sizes="200px"
                quality={90}
                className="object-cover"
              />
            </div>
            <div className="exp-script-under-inset">
              <span className="exp-handwritten-script">Capture the Soul</span>
            </div>
          </div>
        </div>
      </section>

      {/* Custom journey map and interest selector */}
      <section className="exp-custom-journey">
        <div className="exp-custom-copy"><p className="exp-gold-eyebrow">WE DESIGN A JOURNEY FOR YOU</p><h2>We draw your Kashi<br />around <em>your needs.</em></h2><p>Whether you’re here for spirituality, culture, food or photography, we create custom experiences around your interests, time and travel style.</p><a href="#enquiry" className="exp-hero-btn">Plan your experiences <ArrowRight size={14} /></a></div>
        <div className="exp-route-map" aria-label="Illustrated Kashi route map"><svg viewBox="0 0 520 280" role="img" aria-label="Route through Varanasi"><path d="M42 202 C100 160 124 229 185 161 S285 191 330 120 401 122 476 58"/><circle cx="42" cy="202" r="6"/><circle cx="185" cy="161" r="6"/><circle cx="330" cy="120" r="6"/><circle cx="476" cy="58" r="6"/></svg><span className="route-label route-one">Assi Ghat</span><span className="route-label route-two">Dashashwamedh Ghat</span><span className="route-label route-three">Kashi Vishwanath</span><span className="route-label route-four">Sarnath</span><span className="route-label route-five">Ramnagar Fort</span></div>
        <div className="exp-interest-card"><h3>Tell us your interests</h3>{["Spiritual & Temples","Culture & Heritage","Food & Culinary","Photography","Local Life & Markets","Festivals & Events"].map((item)=><label key={item}><input type="checkbox" />{item}</label>)}</div>
      </section>

      <section className="exp-traveller-stories"><div className="exp-testimonial-heading"><p className="exp-gold-eyebrow">TRAVELLER STORIES</p><h2>Experiences that<br /><em>Stay Forever.</em></h2><p>Hear from travellers who experienced the real Varanasi with us.</p></div><div className="exp-testimonial-grid">{testimonials.map((item)=><article className="exp-testimonial-card" key={item.author}><div className="exp-testimonial-photo"><Image src={item.avatar} alt={item.author} fill sizes="(max-width:700px) 80vw, 240px" /></div><p>“{item.quote}”</p><strong>{item.author}</strong><small>{item.location}</small></article>)}</div></section>

      {/* ========================================================
          12. INTERACTIVE JOURNEY ENQUIRY FORM
      ======================================================== */}
      <div id="enquiry">
        <JourneyEnquiry />
      </div>
    </div>
  );
}
