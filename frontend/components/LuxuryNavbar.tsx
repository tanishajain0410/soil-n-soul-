"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

const navItems = [
  ["Home", "/"],
  ["Experiences", "/experiences"],
  ["Journeys", "/journeys"],
  ["About", "/about"],
  ["Journal", "/blog"],
  ["Contact", "/contact"],
];

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
    ["Journal", "/blog"],
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
          <Link href="/" aria-label="Soil N Soul Travels home">
            <img
              src="/soil-n-soul-logo.svg"
              alt="Soil N Soul Varanasi Experiences"
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
            <a
              href="https://wa.me/919580417547?text=Hello%20Soil%20n%20Soul%2C%20I%20would%20like%20to%20plan%20a%20journey%20to%20Varanasi."
              target="_blank"
              rel="noreferrer"
              className="exp-nav-wa-btn"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon />
            </a>

            <a
              href={isAboutPage || isJourneyPage || isContactPage || isBlogPage || currentPath === "/" ? "#contact" : "/#contact"}
              className="exp-nav-cta-btn"
            >
              <span>
                {isAboutPage || isContactPage || isBlogPage
                  ? "Design My Journey"
                  : isJourneyPage
                  ? "Design Your Journey"
                  : "Plan Your Journey"}
              </span>
              <ArrowRight size={13} />
            </a>

            <button
              className="exp-nav-menu-btn"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Fullscreen Drawer */}
      {mobileMenuOpen && (
        <div className="exp-mobile-drawer">
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
          </div>
          <a
              href={isJourneyPage || isAboutPage || isContactPage || isBlogPage || currentPath === "/" ? "#contact" : "/#contact"}
            className="exp-hero-btn"
            style={{ marginTop: 20 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>{isAboutPage || isContactPage || isBlogPage ? "Design My Journey" : isJourneyPage ? "Design Your Journey" : "Plan Your Journey"}</span>
            <ArrowRight size={14} />
          </a>
        </div>
      )}
    </>
  );
}
