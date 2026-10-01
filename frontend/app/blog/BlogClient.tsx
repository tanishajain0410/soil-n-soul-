"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type BlogPost } from "@/lib/api";
import { journalImage } from "@/lib/media";
import JourneyEnquiry from "@/components/JourneyEnquiry";
import { submitInquiry } from "@/lib/inquiries";

type Preview = Pick<
  BlogPost,
  | "_id"
  | "title"
  | "slug"
  | "excerpt"
  | "bannerImage"
  | "category"
  | "createdAt"
  | "isFeatured"
>;

const CATEGORIES = [
  "All Stories",
  "Travel Guide",
  "Spirituality",
  "Culture & Heritage",
  "Food & Culinary",
  "Local People",
  "Festivals & Events",
  "Tips & Insights",
];

const INTEREST_CATEGORIES = [
  { name: "Travel Guides", description: "Plan better, travel deeper.", image: "/images/journal-ref/card1_sunrise_hd.jpg" },
  { name: "Spirituality", description: "Faith, rituals and inner journeys.", image: "/SnS/sacred-kashi.webp" },
  { name: "Culture & Heritage", description: "People, craft and traditions.", image: "/SnS/the-hands-of-banaras.webp" },
  { name: "Food & Culinary", description: "Flavours and local encounters.", image: "/SnS/the-banarasi-table.webp" },
  { name: "Festivals & Events", description: "Celebrations that bring Kashi alive.", image: "/SnS/celebrations.webp" },
];

function displayCategory(category?: string) {
  if (/craft|culture|heritage/i.test(category || "")) return "Culture & Heritage";
  if (/food|culinary/i.test(category || "")) return "Food & Culinary";
  if (/solo|travel tips|insights|wellness/i.test(category || "")) return "Tips & Insights";
  if (/local|people/i.test(category || "")) return "Local People";
  if (/festival|event/i.test(category || "")) return "Festivals & Events";
  if (/spirituality|spiritual/i.test(category || "")) return "Spirituality";
  if (/travel guide|guides/i.test(category || "")) return "Travel Guide";
  return category || "Travel Guide";
}

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
    _id: "editorial-card-5",
    slug: "the-flavours-of-kashi",
    title: "The Flavours of Kashi",
    excerpt: "A sensory culinary trail through ancient galis, legendary halwais, and winter malaiyo.",
    category: "Food & Culinary",
    bannerImage: "/SnS/the-banarasi-table.webp",
  },
  {
    _id: "editorial-card-6",
    slug: "celebrating-dev-deepavali",
    title: "Celebrating Dev Deepavali",
    excerpt: "A million glowing earthen lamps along 84 ghats, sacred chants, and celestial radiance.",
    category: "Festivals & Events",
    bannerImage: "/SnS/celebrations.webp",
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

  // Featured article:
  // 1. Highest Priority: Any article the admin marked as isFeatured in Admin Panel
  // 2. Fallback: Aarti signature article
  // 3. Fallback: First published article or DEFAULT_FEATURED
  const featuredArticle =
    posts.find((p) => p.isFeatured) ||
    posts.find((p) => p.slug === "the-magic-of-ganga-aarti") ||
    posts[0] ||
    DEFAULT_FEATURED;

  // Curated editorial ordering for grid cards
  const curatedOrder = [
    "a-perfect-day-in-varanasi",
    "the-artisans-of-banaras",
    "the-flavours-of-kashi",
    "celebrating-dev-deepavali",
    "temples-that-tell-stories",
    "a-womans-journey-through-kashi",
  ];

  const sourceArticles = posts.length > 0 ? posts : DEFAULT_EDITORIAL_ARTICLES;
  const isFiltering = selectedCategory !== "All Stories";

  // When All Stories: exclude featuredArticle because it is highlighted in #featured
  // When category selected: show ALL articles that belong to that category
  const filteredArticles = sourceArticles
    .filter((article) => {
      if (!isFiltering) {
        return article.slug !== featuredArticle.slug;
      }
      return displayCategory(article.category) === selectedCategory;
    })
    .sort((a, b) => {
      const idxA = curatedOrder.indexOf(a.slug);
      const idxB = curatedOrder.indexOf(b.slug);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });

  const scrollToStories = () => {
    setTimeout(() => {
      const target = document.getElementById("stories-view") || document.getElementById("categories");
      if (target) {
        const yOffset = -90;
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 60);
  };

  const handleSelectCategory = (catName: string, shouldScroll = false) => {
    setSelectedCategory(catName);
    if (shouldScroll) {
      scrollToStories();
    }
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
            <span className="journal-eyebrow">THE SOUL BLOG</span>
            <h1 className="journal-hero-title">
              Stories from<br />
              <em>Kashi and Beyond.</em>
            </h1>
            <p className="journal-hero-sub">
              Real stories, local perspectives, travel tips and soulful insights
              from the heart of Varanasi.
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
              <span className="journal-hero-explore-text">EXPLORE BLOG</span>
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
          2. BLOG INTRO SECTION
          ======================================================== */}
      <section id="intro" className="journal-intro">
        <div className="journal-container">
          <div className="journal-intro-grid">
            {/* Left Column: Heading */}
            <div className="journal-intro-left">
              <span className="journal-eyebrow journal-intro-eyebrow">
                OUR BLOG
              </span>
              <h2 className="journal-intro-title">
                Stories that bring<br />
                <span className="journal-intro-title-italic">
                  you closer to Kashi.
                </span>
              </h2>
            </div>

            {/* Center Column: Supporting Text & CTA */}
            <div className="journal-intro-center">
              <p className="journal-intro-desc">
                From timeless traditions to hidden lanes, from local voices to travel tips — our blog brings you deeper perspectives on the culture, people, spirituality and everyday life of Varanasi.
              </p>
              <a href="/about" className="journal-intro-link">
                Read about our story →
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
                  alt="SoilNSoul Travels Heritage Seal"
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
      <nav id="categories" className="journal-categories-bar" aria-label="Blog categories">
        <div className="journal-container">
          <div className="journal-categories-scroll">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`journal-cat-btn ${isActive ? "active" : ""}`}
                  onClick={() => handleSelectCategory(cat, false)}
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
          4. FEATURED BLOG STORY (EDITORIAL MAGAZINE SPLIT)
          Only displayed when viewing All Stories, so users filtering by category see their actual filtered stories immediately!
          ======================================================== */}
      {!isFiltering && (
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
                  <span className="journal-featured-tag">FEATURED ARTICLE</span>
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
                  Explore the blog for local perspectives on
                  culture, spirituality, and life in Kashi.
                </p>
                <a href="#grid" className="journal-featured-notes-link">
                  Explore all stories →
                </a>
                <div className="journal-featured-notes-foot">
                  <span className="journal-featured-notes-rule" aria-hidden="true" />
                  <p>People who shape Kashi. Places that hold its memory.</p>
                  <span className="journal-featured-notes-signoff">
                    LOCAL VOICES · TIMELESS STORIES
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          5. ARTICLE GRID (OR FILTERED STORIES VIEW)
          ======================================================== */}
      <section id="stories-view" className="journal-grid-section">
        {/* Invisible anchor for backward compatibility with #grid */}
        <div id="grid" style={{ position: "relative", top: "-90px", visibility: "hidden" }} />
        <div className="journal-container">
          {isFiltering && (
            <div className="journal-filter-header">
              <div className="journal-filter-header-left">
                <span className="journal-eyebrow">EXPLORE STORIES</span>
                <h2 className="journal-filter-title">{selectedCategory}</h2>
                <p className="journal-filter-desc">
                  {filteredArticles.length} {filteredArticles.length === 1 ? "story" : "stories"} curated from Kashi
                </p>
              </div>
              <button
                type="button"
                className="journal-filter-reset-btn"
                onClick={() => handleSelectCategory("All Stories", false)}
              >
                ← View all stories
              </button>
            </div>
          )}

          {filteredArticles.length === 0 ? (
            <div className="journal-empty-category">
              <p>No stories published in this category yet.</p>
              <button
                type="button"
                className="journal-filter-reset-btn"
                onClick={() => handleSelectCategory("All Stories", false)}
              >
                ← Return to all stories
              </button>
            </div>
          ) : (
            <div className="journal-cards-grid">
              {filteredArticles.map((post, idx) => {
                const fallbackImgs = [
                  "/images/journal-ref/card1_sunrise_hd.jpg",
                  "/SnS/banarasi-silk-detail.webp",
                  "/images/journal-ref/card3_temples_hd.jpg",
                  "/images/journal-ref/card4_solowoman_hd.jpg",
                  "/SnS/the-banarasi-table.webp",
                  "/SnS/celebrations.webp",
                ];
                const imgSrc = post.bannerImage
                  ? journalImage(post.bannerImage)
                  : fallbackImgs[idx % fallbackImgs.length];

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
                        {displayCategory(post.category)}
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
          )}
        </div>
      </section>

      {/* ========================================================
          6. EXPLORE BY INTEREST SECTION
          ======================================================== */}
      <section className="blog-interest-section" aria-labelledby="blog-interest-heading">
        <div className="journal-container">
          <div className="blog-interest-heading">
            <div>
              <span className="journal-eyebrow">EXPLORE BY INTEREST</span>
              <h2 id="blog-interest-heading">Stories for<br/><em>every curiosity.</em></h2>
              <p>Choose a theme to explore stories, guides and local insights that inspire your next journey.</p>
            </div>
            <button
              type="button"
              className="blog-interest-browse-link"
              onClick={() => handleSelectCategory("All Stories", true)}
            >
              Browse all stories <ArrowRight size={14}/>
            </button>
          </div>
          <div className="blog-interest-grid">
            {INTEREST_CATEGORIES.map((category) => (
              <button
                type="button"
                className="blog-interest-card"
                key={category.name}
                onClick={() => {
                  const filterName = category.name === "Travel Guides" ? "Travel Guide" : category.name;
                  handleSelectCategory(filterName, true);
                }}
              >
                <Image src={category.image} alt={category.name} fill sizes="(max-width: 640px) 82vw, 20vw" />
                <span className="blog-interest-shade" />
                <span className="blog-interest-copy">
                  <strong>{category.name}</strong>
                  <small>{category.description}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-founder-quote" aria-label="A note from our founder">
        <img src="/images/about-ref/temple_watermark_trans.png" alt="" aria-hidden="true" />
        <blockquote>“Every lane in Kashi has a story.<br/><em>We just help you listen.</em></blockquote>
        <p>— Anchal Pandey <span>Founder, SoilNSoul Travels</span></p>
      </section>

      <JourneyEnquiry />

    </div>
  );
}
