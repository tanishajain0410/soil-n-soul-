"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/api";
import { journalImage } from "@/lib/media";

type Preview = Pick<
  BlogPost,
  | "_id"
  | "title"
  | "slug"
  | "excerpt"
  | "bannerImage"
  | "category"
  | "createdAt"
>;

const CATEGORIES = [
  "All Stories",
  "Travel Guide",
  "Spirituality",
  "Crafts & Culture",
  "Wellness",
  "Music",
  "Solo Women Travel",
];

// Curated default editorial articles matching reference design when DB posts are empty or augmenting them
const DEFAULT_EDITORIAL_ARTICLES = [
  {
    _id: "editorial-card-1",
    slug: "a-perfect-day-in-varanasi",
    title: "A Perfect Day in Varanasi",
    excerpt: "A soulful guide to experiencing Kashi beyond the usual.",
    category: "Travel Guide",
    bannerImage: "/images/journal-ref/card1_sunrise_hd.jpg",
  },
  {
    _id: "editorial-card-2",
    slug: "the-artisans-of-banaras",
    title: "The Artisans of Banaras",
    excerpt: "Stories of the weavers keeping centuries-old traditions alive.",
    category: "Crafts & Culture",
    bannerImage: "/SnS/banarasi-silk-detail.webp",
  },
  {
    _id: "editorial-card-3",
    slug: "temples-that-tell-stories",
    title: "Temples that Tell Stories",
    excerpt: "Sacred spaces, deeper meanings, and timeless legends.",
    category: "Spirituality",
    bannerImage: "/images/journal-ref/card3_temples_hd.jpg",
  },
  {
    _id: "editorial-card-4",
    slug: "a-womans-journey-through-kashi",
    title: "A Woman’s Journey Through Kashi",
    excerpt: "Safety, stories, and the joy of exploring solo in Varanasi.",
    category: "Solo Women Travel",
    bannerImage: "/images/journal-ref/card4_solowoman_hd.jpg",
  },
];

const DEFAULT_FEATURED = {
  _id: "featured-aarti",
  slug: "the-magic-of-ganga-aarti",
  title: "The Magic of Ganga Aarti",
  excerpt: "Faith, fire, and an experience that stays with you forever.",
  category: "Spirituality",
  bannerImage: "/images/journal-ref/featured_ganga_aarti_clean.jpg",
};

export default function BlogClient({ posts = [] }: { posts: Preview[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All Stories");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<string | null>(null);

  // Combine real posts with curated fallback to ensure all 4 cards display if posts are fewer
  const allArticles = posts.length > 0 ? posts : DEFAULT_EDITORIAL_ARTICLES;

  // Filtered stories based on category
  const filteredArticles = allArticles.filter((article) => {
    if (selectedCategory === "All Stories") return true;
    return (
      article.category?.trim().toLowerCase() ===
      selectedCategory.trim().toLowerCase()
    );
  });

  // Featured article: find a spirituality/aarti article or fallback to default
  const featuredArticle =
    posts.find(
      (p) =>
        /aarti|ganga|magic|spirituality/i.test(p.title) ||
        /spirituality/i.test(p.category),
    ) || DEFAULT_FEATURED;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus("Subscribing...");
    const subject = encodeURIComponent("The Soul Journal — Newsletter Request");
    const body = encodeURIComponent(
      `Please subscribe ${newsletterEmail} to The Soul Journal. I would like to receive cultural stories, travel tips, and updates from Varanasi.`
    );
    window.location.href = `mailto:info@soilnsoultravels.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setNewsletterStatus("Thank you! Opening your email app...");
      setNewsletterEmail("");
    }, 400);
  };

  return (
    <div className="journal-page-root">

      {/* ========================================================
          1. HERO SECTION (EXACT REFERENCE DESIGN)
          ======================================================== */}
      <header className="journal-hero">
        <div className="journal-hero-bg">
          <Image
            src="/images/about-hero-sunset.jpg"
            alt="Sunset over the ancient ghats of Varanasi and river Ganga"
            fill
            priority
            sizes="100vw"
            className="journal-hero-img"
          />
        </div>
        <div className="journal-hero-overlay" />

        <div className="journal-container journal-hero-content">
          {/* Left Content */}
          <div className="journal-hero-left">
            <span className="journal-eyebrow">THE SOUL JOURNAL</span>
            <h1 className="journal-hero-title">
              There’s a story<br />
              <em>around every corner.</em>
            </h1>
            <p className="journal-hero-sub">
              Cultural dispatches, local perspectives, and thoughtful guides
              from the heart of Kashi.
            </p>
            <a href="#intro" className="journal-hero-explore-btn">
              <span className="journal-hero-explore-circle">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </span>
              <span
                style={{
                  display: "inline-block",
                  width: "16px",
                  height: "1px",
                  backgroundColor: "var(--journal-gold)",
                }}
              />
              <span className="journal-hero-explore-text">EXPLORE STORIES</span>
            </a>
          </div>

          {/* Right Content: Script Stack & Temple Line-Art Watermark */}
          <div className="journal-hero-right">
            <img
              src="/images/about-ref/temple_watermark_trans.png"
              alt=""
              aria-hidden="true"
              className="journal-hero-watermark"
            />
            <div className="journal-hero-script-stack">
              <span>People</span>
              <span>Places</span>
              <span>Stories</span>
              <span>Kashi</span>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
          2. JOURNAL INTRO SECTION
          ======================================================== */}
      <section id="intro" className="journal-intro">
        <div className="journal-container">
          <div className="journal-intro-grid">
            {/* Left Column: Heading */}
            <div className="journal-intro-left">
              <span className="journal-eyebrow journal-intro-eyebrow">
                THE SOUL JOURNAL
              </span>
              <h2 className="journal-intro-title">
                Stories from the<br />
                <span className="journal-intro-title-italic">
                  Heart of India.
                </span>
              </h2>
            </div>

            {/* Center Column: Supporting Text & CTA */}
            <div className="journal-intro-center">
              <p className="journal-intro-desc">
                Real stories, local voices, and deeper<br />
                perspectives on the culture, people,<br />
                spirituality, and everyday life of Varanasi.
              </p>
              <a href="#featured" className="journal-intro-link">
                Read the journal →
              </a>
            </div>

            {/* Right Column: Framed Photo, Line-Art, Stamp & Script */}
            <div className="journal-intro-right">
              <img
                src="/images/about-ref/temple_watermark_trans.png"
                alt=""
                aria-hidden="true"
                className="journal-intro-temple-sketch"
              />
              <div className="journal-intro-photo-card">
                <Image
                  src="/images/journal-ref/intro_alley_hd.jpg"
                  alt="Ancient Varanasi stone lane bathed in morning sunlight"
                  width={130}
                  height={110}
                  className="journal-intro-photo"
                />
              </div>
              <div className="journal-intro-stamp-box">
                <img
                  src="/images/about-ref/founder_stamp_trans.png"
                  alt="Soil N Soul Heritage Seal"
                  className="journal-intro-stamp-img"
                />
                <div className="journal-intro-stamp-script">
                  Kashi<br />Through<br />Local Eyes
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. CATEGORY NAVIGATION (HORIZONTAL SCROLL)
          ======================================================== */}
      <nav className="journal-categories-bar" aria-label="Journal categories">
        <div className="journal-container">
          <div className="journal-categories-scroll">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`journal-cat-btn ${isActive ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={isActive}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ========================================================
          4. FEATURED JOURNAL STORY (EDITORIAL MAGAZINE SPLIT)
          ======================================================== */}
      <section id="featured" className="journal-featured-section">
        <div className="journal-container">
          <div className="journal-featured-grid">
            {/* Left: Large Editorial Aarti Card */}
            <Link
              href={`/blog/${featuredArticle.slug}`}
              className="journal-featured-card"
              aria-label={`Read featured story: ${featuredArticle.title}`}
            >
              <Image
                src={featuredArticle.bannerImage || "/images/journal-ref/featured_ganga_aarti_clean.jpg"}
                alt={featuredArticle.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="journal-featured-card-img"
              />
              <div className="journal-featured-card-overlay">
                <span className="journal-featured-tag">FEATURED STORY</span>
                <div className="journal-featured-bottom">
                  <div className="journal-featured-bottom-left">
                    <div className="journal-featured-cat-label">
                      {featuredArticle.category || "Spirituality"}
                    </div>
                    <h3 className="journal-featured-card-title">
                      {featuredArticle.title}
                    </h3>
                    <p className="journal-featured-card-desc">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                  <div className="journal-featured-circle-btn" aria-hidden="true">
                    <ArrowRight size={17} />
                  </div>
                </div>
              </div>
            </Link>

            {/* Right: Notes from Banaras Editorial Column */}
            <div className="journal-featured-right">
              <img
                src="/images/about-ref/temple_watermark_trans.png"
                alt=""
                aria-hidden="true"
                className="journal-featured-temple-bg"
              />
              <span className="journal-eyebrow journal-featured-notes-eyebrow">
                NOTES FROM BANARAS
              </span>
              <h3 className="journal-featured-notes-title">
                There is always<br />
                another story.
              </h3>
              <p className="journal-featured-notes-desc">
                Explore our journal for local perspectives on
                culture, spirituality, and life in Kashi.
              </p>
              <a href="#grid" className="journal-featured-notes-link">
                Explore the journal →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. ARTICLE GRID (4 COLUMNS DESKTOP)
          ======================================================== */}
      <section id="grid" className="journal-grid-section">
        <div className="journal-container">
          <div className="journal-cards-grid">
            {filteredArticles.slice(0, 4).map((post, idx) => {
              // Ensure image is high-res
              const fallbackImgs = [
                "/images/journal-ref/card1_sunrise_hd.jpg",
                "/SnS/banarasi-silk-detail.webp",
                "/images/journal-ref/card3_temples_hd.jpg",
                "/images/journal-ref/card4_solowoman_hd.jpg",
              ];
              const imgSrc = post.bannerImage
                ? journalImage(post.bannerImage)
                : fallbackImgs[idx % 4];

              return (
                <Link
                  key={post._id || post.slug}
                  href={`/blog/${post.slug}`}
                  className="journal-card"
                  aria-label={`Read ${post.title}`}
                >
                  <div className="journal-card-media">
                    <Image
                      src={imgSrc}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="journal-card-img"
                    />
                    <span className="journal-card-badge">
                      {post.category || "Journal"}
                    </span>
                  </div>
                  <div className="journal-card-body">
                    <h4 className="journal-card-title">{post.title}</h4>
                    <p className="journal-card-desc">{post.excerpt}</p>
                    <div className="journal-card-footer">
                      <span className="journal-card-arrow-btn" aria-hidden="true">
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          6. NEWSLETTER SECTION (DARK EDITORIAL BANNER)
          ======================================================== */}
      <section className="journal-newsletter-section">
        <div className="journal-container">
          <div className="journal-newsletter-inner">
            {/* Left Photo: Ghats Sunset, Chai & Journal */}
            <div className="journal-newsletter-photo-col">
              <Image
                src="/images/journal-ref/newsletter_ghats_hd.jpg"
                alt="Cozy moment on Varanasi ghats with chai and travel journal"
                fill
                sizes="(max-width: 1024px) 0vw, 280px"
                className="journal-newsletter-photo"
              />
            </div>

            {/* Center: Heading & Subtext */}
            <div className="journal-newsletter-text-col">
              <h3 className="journal-newsletter-title">
                A little Kashi, in your inbox.
              </h3>
              <p className="journal-newsletter-desc">
                Curated stories, travel tips, and local insights from the
                Soul Journal, delivered with love.
              </p>
            </div>

            {/* Right: Email Signup Form */}
            <div className="journal-newsletter-form-col">
              <form
                onSubmit={handleNewsletterSubmit}
                className="journal-newsletter-form"
              >
                <div className="journal-newsletter-input-row">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email address"
                    className="journal-newsletter-input"
                    aria-label="Email address for Soul Journal newsletter"
                  />
                  <button type="submit" className="journal-newsletter-btn">
                    Sign up →
                  </button>
                </div>
                <span className="journal-newsletter-subnote">
                  {newsletterStatus ||
                    "Get updates on new stories, travel guides, and experiences."}
                </span>
              </form>
              <img
                src="/images/about-ref/leaf_philosophy_trans.png"
                alt=""
                aria-hidden="true"
                className="journal-newsletter-leaf-art"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
