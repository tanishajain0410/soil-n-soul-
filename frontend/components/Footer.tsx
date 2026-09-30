import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

const exploreLinks = [
  ["Home", "/"],
  ["Experiences", "/experiences"],
  ["Journeys", "/journeys"],
  ["About", "/about"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
];

const journeyLinks = [
  ["Dharm — Spiritual", "/journeys/dharm"],
  ["Arth — Heritage", "/journeys/arth"],
  ["Kaam — Love & Leisure", "/journeys/kaam"],
  ["Moksh — Wellness", "/journeys/moksh"],
];

const experienceLinks = [
  ["Sacred Kashi", "/experiences#sacred-kashi"],
  ["Living Banaras", "/experiences#living-banaras"],
  ["Taste of Kashi", "/experiences#taste-of-kashi"],
  ["Hidden Banaras", "/experiences#hidden-banaras"],
  ["Celebrations", "/experiences#celebrations"],
  ["Kashi Through Your Lens", "/experiences#kashi-through-your-lens"],
];

export default function Footer() {
  return (
    <footer className="footer-reference">
      <div className="footer-reference-inner">
        {/* Column 1: Brand & Social */}
        <div className="footer-col footer-col-brand">
          <Link href="/" className="footer-brand-logo" aria-label="SoilNSoul Travels home">
            <img src="/soil-n-soul-logo.svg" alt="SoilNSoul Travels Varanasi Experiences" />
          </Link>
          <p className="footer-tagline">
            Thoughtful journeys into<br />the soul of Varanasi.
          </p>
          <div className="footer-social-icons">
            <a
              href="https://www.instagram.com/soilnsoultravels"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="footer-social-btn"
            >
              <InstagramSvg />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="footer-social-btn"
            >
              <FacebookSvg />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="footer-social-btn"
            >
              <YoutubeSvg />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="footer-social-btn"
            >
              <LinkedinSvg />
            </a>
          </div>
        </div>

        {/* Column 2: Explore */}
        <div className="footer-col">
          <h4 className="footer-heading">EXPLORE</h4>
          <ul className="footer-links">
            {exploreLinks.map(([label, href]) => (
              <li key={label}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Journeys */}
        <div className="footer-col">
          <h4 className="footer-heading">JOURNEYS</h4>
          <ul className="footer-links">
            {journeyLinks.map(([label, href]) => (
              <li key={label}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Experiences */}
        <div className="footer-col">
          <h4 className="footer-heading">EXPERIENCES</h4>
          <ul className="footer-links">
            {experienceLinks.map(([label, href]) => (
              <li key={label}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Personal Conversation */}
        <div className="footer-col footer-col-contact">
          <h4 className="footer-heading">A PERSONAL CONVERSATION</h4>
          <div className="footer-contact-list">
            <a href="tel:+919580417547" className="footer-contact-item">
              <Phone size={14} className="footer-icon" />
              <span>+91 95804 17547</span>
            </a>
            <a href="mailto:info@soilnsoultravels.com" className="footer-contact-item">
              <Mail size={14} className="footer-icon" />
              <span>info@soilnsoultravels.com</span>
            </a>
            <div className="footer-contact-item">
              <MapPin size={14} className="footer-icon" />
              <span>Varanasi, Uttar Pradesh, India</span>
            </div>
          </div>
          <Link href="/#contact" className="footer-cta-btn">
            <span>Plan Your Journey</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Decorative Temple Illustration Watermark on Right */}
        <div className="footer-temple-watermark" aria-hidden="true">
          <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 190h300M30 190v-40h20v-30h15v-20h10V70h8V50h6V30h4V15h2v-5h2v5h4v15h6v20h8v30h10v30h15v30h20v40M70 190v-30h20v30M130 190v-50h30v50M180 190v-35h25v35M230 190v-45h20v45"
              stroke="#dfbf80"
              strokeWidth="0.8"
              strokeOpacity="0.25"
            />
            <path
              d="M140 190v-60h16v-25h10V85h6V60h4V40h2v-8h2v8h4v20h6v25h10v20h16v60"
              stroke="#dfbf80"
              strokeWidth="0.8"
              strokeOpacity="0.22"
            />
            <path
              d="M240 190v-50h14v-20h8v-15h5v-10h3v-6h2v6h3v10h5v15h8v20h14v50"
              stroke="#dfbf80"
              strokeWidth="0.7"
              strokeOpacity="0.18"
            />
          </svg>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-inner">
          <p className="footer-copyright">
            © {new Date().getFullYear()} SoilNSoul Travels. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span className="footer-sep">|</span>
            <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function InstagramSvg() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookSvg() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeSvg() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
    </svg>
  );
}

function LinkedinSvg() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
