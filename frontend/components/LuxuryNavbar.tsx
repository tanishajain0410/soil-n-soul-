"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X, Lock } from "lucide-react";

export default function LuxuryNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname || "";
  const isAboutPage = currentPath === "/about";
  const isJourneyPage = currentPath === "/journeys";
  const isContactPage = currentPath === "/contact";
  const isBlogPage = currentPath === "/blog" || currentPath === "/journal";

  const links = [
    ["Home", "/"],
    ["Experiences", "/experiences"],
    ["Journeys", "/journeys"],
    ["About", "/about"],
    ["Blog", "/blog"],
    ["Contact", "/contact"],
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", closeOnEscape);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", closeOnEscape);
      };
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className={`exp-nav-header ${scrolled ? "scrolled" : ""}`}>
        <div className="exp-nav-inner">
          {/* Logo */}
          <Link href="/" aria-label="SoilNSoul Travels home">
            <img
              src={scrolled ? "/soil-n-soul-logo-dark.svg" : "/soil-n-soul-logo.svg"}
              alt="SoilNSoul Travels Varanasi Experiences"
              className="exp-nav-logo"
            />
          </Link>

          {/* Center Navigation Links */}
          <nav className="exp-nav-links" aria-label="Main Navigation">
            {links.map(([label, href]) => {
              const isActive =
                href === "/"
                  ? currentPath === "/"
                  : currentPath === href || currentPath.startsWith(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={`exp-nav-link ${isActive ? "active" : ""}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="exp-nav-actions">
            {/* Admin Lock Button */}
            <Link
              href="/admin"
              className="exp-nav-lock-btn"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <Lock size={14} />
              <span className="exp-nav-lock-text">Admin</span>
            </Link>
            <a
              href={isAboutPage || isJourneyPage || isContactPage || isBlogPage || currentPath === "/" ? "#contact" : "/#contact"}
              className="exp-nav-cta-btn"
            >
              <span>Plan Your Journey</span>
              <ArrowRight size={13} />
            </a>

            <button
              type="button"
              className="exp-nav-menu-btn"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="exp-mobile-drawer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Fullscreen Drawer */}
      {mobileMenuOpen && (
        <div id="exp-mobile-drawer" className="exp-mobile-drawer">
          <button
            className="exp-mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          <div className="exp-mobile-links-wrap">
            {links.map(([label, href]) => {
              const isActive =
                href === "/"
                  ? currentPath === "/"
                  : currentPath === href || currentPath.startsWith(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={`exp-mobile-link ${isActive ? "active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/admin"
              className="exp-mobile-link flex items-center justify-center gap-2 text-[#d9ad57]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Lock size={18} />
              <span>Admin Portal</span>
            </Link>
          </div>
          <a
              href={isJourneyPage || isAboutPage || isContactPage || isBlogPage || currentPath === "/" ? "#contact" : "/#contact"}
            className="exp-hero-btn"
            style={{ marginTop: 20 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Plan Your Journey</span>
            <ArrowRight size={14} />
          </a>
        </div>
      )}
    </>
  );
}
