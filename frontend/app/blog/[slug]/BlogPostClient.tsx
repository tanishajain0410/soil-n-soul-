'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';
import {
  Calendar,
  Clock,
  Sparkles,
  Share2,
  Send,
  Mail,
  Link2,
  Check,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { API_URL } from '@/lib/constants';
import JourneyEnquiry from '@/components/JourneyEnquiry';

export default function BlogPostClient({ post, recentBlogs }: { post: any; recentBlogs: any[] }) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const API_BASE = API_URL ? API_URL.replace(/\/api\/?$/, '').replace(/\/$/, '') : '';
  const resolveBlogImage = (source?: string) => {
    if (!source) return '';
    if (/^(https?:|data:|blob:)/i.test(source)) return source;
    if (source.startsWith('/uploads/')) return `${API_BASE}${source}`;
    if (source.startsWith('/')) return source;
    return API_BASE ? `${API_BASE}/${source}` : `/${source}`;
  };

  useEffect(() => {
    setShareUrl(window.location.href);
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const bannerSrc = resolveBlogImage(post.bannerImage);

  // Fix any relative /uploads image paths in content
  const fixedContent = API_BASE
    ? (post.content || '').replace(/src="\/uploads\//g, `src="${API_BASE}/uploads/`)
    : post.content || '';

  const wordCount = post.content?.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length || 0;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Curated Edition';

  return (
    <div className="blog-detail-root sn-site">
      {/* ── Top Reading Progress Indicator ─────────────────────────────────── */}
      <div
        className="blog-progress-bar"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      {/* ── Atmospheric Editorial Hero Banner ─────────────────────────────── */}
      <header className="blog-hero">
        {bannerSrc ? (
          <div className="blog-hero-media">
            <Image
              src={bannerSrc}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="blog-hero-img"
            />
          </div>
        ) : null}
        <div className="blog-hero-overlay" />

        <div className="blog-hero-content">
          {/* Breadcrumb Navigation */}
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="blog-breadcrumb-sep">/</span>
            <Link href="/blog">The Soul Blog</Link>
            <span className="blog-breadcrumb-sep">/</span>
            <span className="blog-breadcrumb-current">{post.title}</span>
          </nav>

          {/* Category Pill Badge */}
          {post.category && (
            <div className="blog-category-badge">
              <Sparkles size={11} />
              <span>{post.category}</span>
            </div>
          )}

          {/* Majestic Serif Article Title */}
          <h1 className="blog-hero-title">{post.title}</h1>

          {/* Article Metadata Row */}
          <div className="blog-hero-meta">
            <span className="blog-meta-item">
              <Calendar size={14} className="blog-meta-icon" />
              <span>{formattedDate}</span>
            </span>
            <span className="blog-meta-item">
              <Clock size={14} className="blog-meta-icon" />
              <span>{readTime} min read</span>
            </span>
            <span className="blog-meta-item">
              <span className="text-[#d8b66a]">By</span>
              <span className="font-semibold text-white">SoilNSoul Travels</span>
            </span>

            {/* Quick Keyword Tags (if provided) */}
            {post.tags?.length > 0 && (
              <div className="blog-meta-tags hidden sm:flex">
                {post.tags.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="blog-meta-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Editorial Reading Column ─────────────────────────────────── */}
      <main className="blog-content-section">
        <div className="blog-content-inner">
          {/* Curated Lead Description Quote Box */}
          {(post.seoDescription || post.excerpt) && (
            <aside className="blog-lead-box" aria-label="Article Summary">
              <p className="blog-lead-quote">
                “{post.seoDescription || post.excerpt}”
              </p>
            </aside>
          )}

          {/* Sanitized Rich Blog Body Content */}
          <article
            className="blog-body"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(fixedContent, {
                ADD_TAGS: ['iframe'],
                ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
              }),
            }}
          />

          {/* Tags & Interactive Social Share Footer */}
          <footer className="blog-footer-meta">
            {post.tags?.length > 0 && (
              <div className="blog-tags-row">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="blog-tag-badge">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="blog-share-row">
              <span className="blog-share-label">
                <Share2 size={13} />
                <span>Share this story</span>
              </span>

              <div className="blog-share-buttons">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Share on X / Twitter"
                  className="blog-share-btn"
                  aria-label="Share on X / Twitter"
                >
                  <Send size={15} />
                </a>

                <a
                  href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
                  title="Share via Email"
                  className="blog-share-btn"
                  aria-label="Share via Email"
                >
                  <Mail size={15} />
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy link to clipboard"
                  className="blog-share-btn"
                  aria-label="Copy link"
                >
                  {copied ? <Check size={16} className="text-[#1e7e34]" /> : <Link2 size={16} />}
                </button>

                {copied && <span className="blog-copied-tooltip">Link copied!</span>}
              </div>
            </div>

            {/* Luxury Local Concierge / WhatsApp Card */}
            <div className="blog-concierge-card">
              <div className="blog-concierge-info">
                <span className="blog-concierge-eyebrow">DISCOVER KASHI WITH SOILNSOUL</span>
                <h3 className="blog-concierge-title">
                  Planning a journey to <em>Varanasi?</em>
                </h3>
                <p className="blog-concierge-desc">
                  Connect with our local concierge team directly — thoughtful advice, bespoke itineraries, and verified arrangements with zero sales pressure.
                </p>
              </div>

              <a
                href="https://wa.me/919580417547?text=Hi%20SoilNSoul%2C%20I%20read%20your%20story%20and%20would%20like%20to%20plan%20a%20journey%20to%20Varanasi."
                target="_blank"
                rel="noopener noreferrer"
                className="blog-concierge-wa-btn"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Us</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </footer>
        </div>
      </main>

      {/* ── Related Curated Stories (Magazine 3-Card Grid) ────────────────── */}
      {recentBlogs.length > 0 && (
        <section className="blog-related-section" aria-labelledby="related-stories-heading">
          <div className="blog-related-inner">
            <div className="blog-related-header">
              <span className="blog-related-eyebrow">MORE STORIES FROM KASHI</span>
              <h2 id="related-stories-heading" className="blog-related-title">
                Continue Reading <em>Stories that linger in the heart.</em>
              </h2>
            </div>

            <div className="blog-related-grid">
              {recentBlogs.map((r) => {
                const rBanner = resolveBlogImage(r.bannerImage) || '/images/journal-ref/card1_sunrise_hd.jpg';
                return (
                  <Link key={r._id || r.slug} href={`/blog/${r.slug}`} className="blog-related-card">
                    <div className="blog-related-media">
                      <Image
                        src={rBanner}
                        alt={r.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="blog-related-img"
                      />
                      {r.category && <span className="blog-related-badge">{r.category}</span>}
                    </div>

                    <div className="blog-related-body">
                      <h3 className="blog-related-post-title">{r.title}</h3>
                      {r.excerpt && <p className="blog-related-post-desc">{r.excerpt}</p>}
                      <span className="blog-related-cta">
                        <span>Read story</span>
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Founder Quote Watermarked Banner ───────────────────────────────── */}
      <section className="blog-founder-banner" aria-label="A note from our founder">
        <blockquote>
          “Every lane in Kashi has a story.<br />
          <em>We just help you listen.</em>”
        </blockquote>
        <p>
          — Anchal Pandey
          <span>Founder, SoilNSoul Travels</span>
        </p>
      </section>

      {/* ── Luxury Journey Enquiry Consultation ───────────────────────────── */}
      <JourneyEnquiry journey={`Journal Inquiry: ${post.title}`} />
    </div>
  );
}
