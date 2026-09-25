import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const popular = [
  ["The Soul of Kashi", "the-soul-of-kashi"],
  ["Kashi After Dark", "kashi-after-dark"],
  ["The Sacred Morning", "the-sacred-morning"],
  ["The Banarasi Table", "the-banarasi-table"],
  ["Sarnath", "sarnath"],
  ["Kashi Temple Circuit", "kashi-temple-circuit"],
];

export default function JourneyFooter() {
  return <footer className="journey-footer">
    <div className="journey-footer-main">
      <div className="journey-footer-brand"><Link href="/" aria-label="Soil N Soul home"><img src="/soil-n-soul-logo.svg" alt="Soil N Soul Varanasi Experiences"/></Link><p>Thoughtful journeys into<br/>the soul of Varanasi.</p><div className="journey-footer-social"><a href="https://www.instagram.com/soilnsoultravels" aria-label="Instagram" target="_blank" rel="noreferrer">◎</a><a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">f</a><a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noreferrer">▶</a><a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">in</a></div></div>
      <div className="journey-footer-column"><h2>EXPLORE</h2>{[["Home","/"],["Experiences","/experiences"],["Stays","/services/stay"],["Our Story","/about"],["Gallery","/experiences#gallery"],["Blog","/blog"],["Contact","/journeys#contact"]].map(([label,href])=><Link key={label} href={href}>{label}</Link>)}</div>
      <div className="journey-footer-column"><h2>POPULAR JOURNEYS</h2>{popular.map(([label,slug])=><Link key={slug} href={`/journeys/${slug}`}>{label}</Link>)}</div>
      <div className="journey-footer-column journey-footer-contact"><h2>GET IN TOUCH</h2><a href="tel:+919580417547"><Phone size={14}/>+91 95804 17547</a><a href="mailto:hello@soilnsoul.in"><Mail size={14}/>hello@soilnsoul.in</a><span><MapPin size={14}/>Varanasi, Uttar Pradesh, India</span><Link href="/journeys#contact" className="journey-footer-cta">Design Your Journey <ArrowRight size={14}/></Link></div>
      <div className="journey-footer-art" aria-hidden="true"><img src="/images/temple-sketch-right.png" alt=""/></div>
    </div>
    <div className="journey-footer-bottom"><span>© {new Date().getFullYear()} Soil N Soul Experiences. All rights reserved.</span><span><Link href="/privacy-policy">Privacy Policy</Link><i/> <Link href="/terms-and-conditions">Terms &amp; Conditions</Link></span></div>
  </footer>;
}
