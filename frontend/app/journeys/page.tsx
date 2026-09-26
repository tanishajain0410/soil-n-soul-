import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, HeartHandshake, Sparkles, Waves } from "lucide-react";
import JourneyFilterGrid from "@/components/JourneyFilterGrid";
import JourneyEnquiry from "@/components/JourneyEnquiry";
import LuxuryNavbar from "@/components/LuxuryNavbar";

export const metadata: Metadata = {
  title: "Premium Personalised Journeys",
  description:
    "Explore private journey concepts through the culture, flavours and sacred rhythms of Kashi. Each journey is shaped around you.",
  alternates: { canonical: "/journeys" },
};

const values = [
  { icon: Compass, title: "CURATED JOURNEYS", text: <>Thoughtfully designed,<br/>never generic.</> },
  { icon: Sparkles, title: "YOUR INTERESTS", text: <>Personalised around your<br/>dates, companions and style.</> },
  { icon: HeartHandshake, title: "LOCAL EXPERTISE", text: <>Deep local knowledge<br/>and trusted connections.</> },
  { icon: Waves, title: "SEAMLESS PLANNING", text: <>We take care of the details,<br/>so you can simply enjoy.</> },
];

export default function JourneysPage() {
  return (
    <div className="journey-page">
      <LuxuryNavbar />
      <section className="journey-hero" aria-labelledby="journey-page-title">
        <Image src="/images/varanasi-hero-main.jpg" alt="Sunset over the Ganges and Varanasi ghats" fill priority sizes="100vw" quality={80} className="journey-hero-image" />
        <div className="journey-hero-shade" />
        <div className="journey-hero-content">
          <p className="journey-eyebrow">PREMIUM PERSONALISED JOURNEYS</p>
          <h1 id="journey-page-title">A little inspiration.<br/><em>A journey entirely yours.</em></h1>
          <p className="journey-hero-description">Follow a rhythm that feels like you. These journey concepts are starting points, ready to be personalised around your dates, interests, and companions.</p>
          <a className="journey-primary-cta" href="#contact">Design Your Journey <ArrowRight size={15}/></a>
        </div>
        <div className="journey-hero-bottom"><span>01 — PRIVATE JOURNEYS THROUGH KASHI</span><a href="#journey-filters">EXPLORE THE JOURNEYS <span>↓</span></a></div>
      </section>

      <JourneyFilterGrid>
        <section className="journey-editorial" aria-labelledby="journey-editorial-heading">
          <div className="journey-editorial-copy">
            <p className="journey-eyebrow journey-eyebrow-dark">JOURNEYS IN VARANASI</p>
            <h2 id="journey-editorial-heading">Experience<br/><em>The Many<br/>Moods of Kashi.</em></h2>
            <p>From sacred rituals to cultural trails, culinary journeys to hidden gems — explore curated journeys and find the experiences that move you.</p>
            <div className="journey-editorial-note"><span>“</span><em>Not just places to see,<br/>but moments to feel.</em></div>
          </div>
          <div className="journey-editorial-image"><Image src="/SnS/a-deeper-connection.webp" alt="A quiet moment by the Ganges in Varanasi" fill sizes="(max-width: 760px) 100vw, 32vw"/><span>THE MANY MOODS OF KASHI</span></div>
          <div className="journey-editorial-quote">
            <div className="journey-quote-wrap">
              <span className="journey-quote-rule" />
              <blockquote>
                Every journey<br />
                in Varanasi<br />
                is a doorway<br />
                to something<br />
                <em>deeper.</em>
              </blockquote>
            </div>
            <div className="journey-aarti-image">
              <Image
                src="/SnS/sacred-kashi.webp"
                alt="Aarti flame offered in the evening in Varanasi"
                fill
                sizes="(max-width: 760px) 80vw, 20vw"
              />
            </div>
            <Image
              src="/images/temple-sketch-right.png"
              alt=""
              aria-hidden="true"
              width={310}
              height={360}
              className="journey-temple-sketch"
            />
          </div>
        </section>
      </JourneyFilterGrid>

      <section className="journey-values-strip" aria-label="The Soil n Soul difference">
        {values.map(({icon: Icon,title,text})=><div className="journey-value" key={title}><Icon size={26} strokeWidth={1.2}/><div><strong>{title}</strong><span>{text}</span></div></div>)}
      </section>

      <JourneyEnquiry variant="journeys" />
    </div>
  );
}
