"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
  Sparkles,
  Footprints,
  HeartHandshake,
  Landmark,
  Compass,
  Shirt,
  ShoppingBag,
  MapPin,
  Scissors,
  Utensils,
  Heart,
  Sailboat,
  UtensilsCrossed,
  Music,
  Camera,
  PartyPopper,
  Smile,
  Moon,
  Sun,
  Home,
  Phone,
} from "lucide-react";
import type { JourneyCategoryData } from "@/data/journeyCategories";

interface Props {
  data: JourneyCategoryData;
}

export default function JourneyCategoryPage({ data }: Props) {
  // Helper to render dynamic icon for hero strip
  const renderIcon = (name: string) => {
    const props = { size: 18, strokeWidth: 1.6 };
    switch (name) {
      case "Flame":
        return <Flame {...props} />;
      case "Sparkles":
        return <Sparkles {...props} />;
      case "Footprints":
        return <Footprints {...props} />;
      case "HeartHandshake":
        return <HeartHandshake {...props} />;
      case "Landmark":
        return <Landmark {...props} />;
      case "Shirt":
        return <Shirt {...props} />;
      case "ShoppingBag":
        return <ShoppingBag {...props} />;
      case "MapPin":
        return <MapPin {...props} />;
      case "Scissors":
        return <Scissors {...props} />;
      case "Utensils":
        return <Utensils {...props} />;
      case "Heart":
        return <Heart {...props} />;
      case "Sailboat":
        return <Sailboat {...props} />;
      case "UtensilsCrossed":
        return <UtensilsCrossed {...props} />;
      case "Music":
        return <Music {...props} />;
      case "Camera":
        return <Camera {...props} />;
      case "PartyPopper":
        return <PartyPopper {...props} />;
      case "Smile":
        return <Smile {...props} />;
      case "Moon":
        return <Moon {...props} />;
      case "Sun":
        return <Sun {...props} />;
      case "Home":
        return <Home {...props} />;
      default:
        return <Compass {...props} />;
    }
  };

  return (
    <div className="jcat-page">

      {/* 2. FULL-WIDTH HERO */}
      <section className="jcat-hero" aria-label={`${data.categoryName} Hero`}>
        <div className="jcat-hero-bg">
          <Image
            src={data.heroImage}
            alt={data.title}
            fill
            sizes="100vw"
            priority
            quality={90}
          />
        </div>
        <div className="jcat-hero-overlay" />

        <div className="jcat-hero-content">
          <span className="jcat-hero-kicker">JOURNEYS</span>
          <h1 className="jcat-hero-title">{data.categoryName}</h1>
          <p className="jcat-hero-subtitle">{data.title}</p>
          <p className="jcat-hero-desc">{data.heroDescription}</p>

          <div className="jcat-hero-actions">
            <Link
              href={`/contact?journey=${data.slug}`}
              className="jcat-btn-gold"
              id={`hero-plan-btn-${data.slug}`}
            >
              <span>{data.heroCtaText}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Hero Highlights Strip */}
        <div className="jcat-hero-strip">
          <div className="jcat-hero-strip-inner">
            {data.heroHighlights.map((item, idx) => (
              <div key={idx} className="jcat-strip-item">
                <span className="jcat-strip-icon">{renderIcon(item.iconName)}</span>
                <span className="jcat-strip-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CATEGORY INTRODUCTION (CREAM SECTION) */}
      <section className="jcat-intro" id="intro">
        <div className="jcat-intro-inner">
          <div className="jcat-intro-image-wrap">
            <Image
              src={data.introImage}
              alt={data.introHeading}
              fill
              sizes="(max-width: 992px) 100vw, 50vw"
              quality={90}
            />
          </div>

          <div className="jcat-intro-content">
            <span className="jcat-eyebrow">{data.introEyebrow}</span>
            <h2 className="jcat-intro-heading">{data.introHeading}</h2>
            <p className="jcat-intro-p">{data.introDescription1}</p>
            {data.introDescription2 && (
              <p className="jcat-intro-p">{data.introDescription2}</p>
            )}

            <blockquote className="jcat-intro-quote">
              “{data.introQuote}”
            </blockquote>

            <a href="#experiences" className="jcat-intro-link">
              <span>{data.introCtaText}</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* 4. CURATED EXPERIENCES (DARK SECTION) */}
      <section className="jcat-experiences" id="experiences">
        <div className="jcat-section-header">
          <div className="jcat-section-header-left">
            <span className="jcat-eyebrow" style={{ color: "#dfbf80" }}>
              {data.experiencesEyebrow}
            </span>
            <h2 className="jcat-section-heading">{data.experiencesHeading}</h2>
          </div>

          <Link href="/experiences" className="jcat-view-all-link">
            <span>View All Experiences</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="jcat-exp-grid">
          {data.experiences.map((exp, idx) => (
            <article key={idx} className="jcat-exp-card">
              <div className="jcat-exp-card-media">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                />
                {exp.tag && <span className="jcat-exp-tag">{exp.tag}</span>}
              </div>

              <div className="jcat-exp-body">
                <h3 className="jcat-exp-card-title">{exp.title}</h3>
                <p className="jcat-exp-card-desc">{exp.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. DETAILED CATEGORY STORY */}
      <section className="jcat-story">
        <div className="jcat-story-inner">
          <span className="jcat-eyebrow" style={{ color: "#dfbf80" }}>
            A LIVING TRADITION
          </span>
          <h2 className="jcat-story-heading">{data.storyHeading}</h2>

          {data.storyContent.map((paragraph, idx) => (
            <p key={idx} className="jcat-story-text">
              {paragraph}
            </p>
          ))}

          <div className="jcat-story-tags">
            {data.storyTags.map((tag, idx) => (
              <span key={idx} className="jcat-story-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SUGGESTED ITINERARIES (DARK SECTION) */}
      <section className="jcat-itineraries" id="itineraries">
        <div className="jcat-section-header">
          <div className="jcat-section-header-left">
            <span className="jcat-eyebrow" style={{ color: "#dfbf80" }}>
              {data.itinerariesEyebrow}
            </span>
            <h2 className="jcat-section-heading">{data.itinerariesHeading}</h2>
          </div>

          <Link href="/contact" className="jcat-view-all-link">
            <span>View All Itineraries</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="jcat-itin-grid">
          {data.itineraries.map((itin, idx) => (
            <div key={idx} className="jcat-itin-card">
              <div className="jcat-itin-media">
                <Image
                  src={itin.image}
                  alt={itin.title}
                  fill
                  sizes="(max-width: 992px) 100vw, 33vw"
                  quality={85}
                />
                <span className="jcat-itin-badge">{itin.duration}</span>
              </div>

              <div className="jcat-itin-body">
                <h3 className="jcat-itin-title">{itin.title}</h3>
                <p className="jcat-itin-desc">{itin.description}</p>

                {itin.highlights && (
                  <div className="jcat-itin-pills">
                    {itin.highlights.map((h, i) => (
                      <span key={i} className="jcat-itin-pill">
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/contact?journey=${data.slug}&itinerary=${encodeURIComponent(
                    itin.title
                  )}`}
                  className="jcat-itin-cta"
                >
                  <span>Plan This Itinerary</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TESTIMONIAL / TRAVELER STORY (CREAM SECTION) */}
      <section className="jcat-testimonial">
        <div className="jcat-testimonial-inner">
          <div className="jcat-quote-icon">“</div>
          <p className="jcat-quote-text">{data.testimonial.quote}</p>

          <div className="jcat-author-wrap">
            <div className="jcat-author-avatar">
              <Image
                src={data.testimonial.avatar}
                alt={data.testimonial.author}
                fill
                sizes="64px"
                quality={90}
              />
            </div>
            <div className="jcat-author-info">
              <span className="jcat-author-name">{data.testimonial.author}</span>
              <span className="jcat-author-loc">{data.testimonial.location}</span>
            </div>

            <div className="jcat-testimonial-controls" aria-hidden="true">
              <button
                type="button"
                className="jcat-control-btn"
                aria-label="Previous story"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="jcat-control-btn"
                aria-label="Next story"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PERSONALIZED JOURNEY CTA BANNER */}
      <section className="jcat-cta">
        <div className="jcat-cta-bg">
          <Image
            src={data.ctaBackgroundImage}
            alt={data.ctaHeading}
            fill
            sizes="100vw"
            quality={90}
          />
        </div>
        <div className="jcat-cta-overlay" />

        <div className="jcat-cta-content">
          <span className="jcat-cta-eyebrow">{data.ctaEyebrow}</span>
          <h2 className="jcat-cta-title">{data.ctaHeading}</h2>
          <p className="jcat-cta-desc">{data.ctaDescription}</p>

          <div className="jcat-cta-actions">
            <Link
              href={`/contact?journey=${data.slug}`}
              className="jcat-btn-gold"
              id={`cta-plan-btn-${data.slug}`}
            >
              <span>{data.ctaPrimaryText}</span>
              <ArrowRight size={15} />
            </Link>

            <a
              href="https://wa.me/919580417547?text=Hello%20SoilNSoul%20Travels%2C%20I%20would%20like%20to%20plan%20a%20private%20journey%20to%20Varanasi."
              target="_blank"
              rel="noreferrer"
              className="jcat-btn-outline"
              id={`cta-team-btn-${data.slug}`}
            >
              <Phone size={14} />
              <span>{data.ctaSecondaryText}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
