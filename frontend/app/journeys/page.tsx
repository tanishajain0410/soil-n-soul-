import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Camera, Compass, Flame, HeartHandshake, MapPin, Sparkles, Utensils, Waves } from "lucide-react";
import JourneyFilterGrid from "@/components/JourneyFilterGrid";
import JourneyEnquiry from "@/components/JourneyEnquiry";
import { journeyCategories } from "@/data/journeyCategories";

export const metadata: Metadata = {
  title: "Premium Personalised Journeys",
  description:
    "Explore private journey concepts through the culture, flavours and sacred rhythms of Kashi. Each journey is shaped around you.",
  alternates: { canonical: "/journeys" },
};

const values = [
  { icon: Compass, title: "CURATED JOURNEYS", text: <>Thoughtfully designed around your interests.</> },
  { icon: Sparkles, title: "YOUR INTERESTS", text: <>Personalised around your dates, companions and style.</> },
  { icon: HeartHandshake, title: "LOCAL EXPERTISE", text: <>Real local knowledge for authentic experiences.</> },
  { icon: Waves, title: "SEAMLESS PLANNING", text: <>We take care of the details so you can simply enjoy.</> },
];

const themes = [
  { title: "Spiritual Journeys", text: "Sacred rituals, temples and stillness.", image: "/SnS/sacred-kashi.webp", icon: Flame, href: "/journeys/dharm" },
  { title: "Cultural & Heritage", text: "Old lanes, craft and living traditions.", image: "/SnS/varanasi-heritage.webp", icon: Compass, href: "/journeys/arth" },
  { title: "Food & Culinary", text: "Local kitchens and flavours of Kashi.", image: "/SnS/the-banarasi-table.webp", icon: Utensils, href: "/journeys/kaam" },
  { title: "Photography", text: "Golden hours and stories in every frame.", image: "/SnS/kashi-through-your-lens.webp", icon: Camera, href: "#journey-results" },
  { title: "Festivals & Events", text: "Celebrations that bring the city together.", image: "/SnS/celebrations.webp", icon: Sparkles, href: "#journey-results" },
];

const testimonials = [journeyCategories.dharm.testimonial, journeyCategories.arth.testimonial, journeyCategories.kaam.testimonial];

export default function JourneysPage() {
  return (
    <div className="journey-page">
      <section className="journey-hero" aria-labelledby="journey-page-title">
        <Image src="/images/varanasi-hero-main.jpg" alt="Sunset over the Ganges and Varanasi ghats" fill priority sizes="100vw" quality={80} className="journey-hero-image" />
        <div className="journey-hero-shade" />
        <div className="journey-hero-content">
          <p className="journey-eyebrow">PREMIUM PERSONALISED JOURNEYS</p>
          <h1 id="journey-page-title">A little inspiration.<br/><em>A journey entirely yours.</em></h1>
          <p className="journey-hero-description">Follow a rhythm that feels like you. These journey concepts are starting points, ready to be personalised around your dates, interests, and companions.</p>
          <a className="journey-primary-cta" href="#contact">Design Your Journey <ArrowRight size={15}/></a>
          <div className="journey-hero-aside" aria-hidden="true">PRIVATE<br/>MOMENTS<br/><span>IN KASHI</span></div>
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

      <section className="journey-values-strip" aria-label="The SoilNSoul Travels difference">
        {values.map(({icon: Icon,title,text})=><div className="journey-value" key={title}><Icon size={26} strokeWidth={1.2}/><div><strong>{title}</strong><span>{text}</span></div></div>)}
      </section>

      <section className="journey-themes" aria-labelledby="journey-themes-title">
        <div className="journey-themes-head">
          <div><p className="journey-eyebrow">POPULAR JOURNEY THEMES</p><h2 id="journey-themes-title">Journeys for<br/><em>every interest.</em></h2></div>
          <p>Whether you seek spirituality, culture, food, photography or a mix of everything, we’ll shape a journey around what inspires you most.</p>
        </div>
        <div className="journey-theme-grid">
          {themes.map(({title,text,image,icon: Icon,href})=><a className="journey-theme-card" key={title} href={href}>
            <Image src={image} alt="" fill sizes="(max-width: 700px) 82vw, 20vw" />
            <span className="journey-theme-shade" />
            <span className="journey-theme-copy"><Icon size={19} strokeWidth={1.3}/><strong>{title}</strong><small>{text}</small></span>
            <span className="journey-theme-arrow"><ArrowRight size={15}/></span>
          </a>)}
        </div>
      </section>

      <section className="journey-custom" aria-labelledby="journey-custom-title">
        <div className="journey-custom-copy">
          <p className="journey-eyebrow journey-eyebrow-dark">DESIGN YOUR OWN JOURNEY</p>
          <h2 id="journey-custom-title">We draw your Kashi<br/><em>around your needs.</em></h2>
          <p>Choose from our curated journeys or let us create a personalised itinerary based on your interests, time and travel style.</p>
          <a className="journey-primary-cta" href="#contact">Design Your Journey <ArrowRight size={15}/></a>
        </div>
        <JourneyMapIllustration />
        <div className="journey-interest-card">
          <h3>Tell us your interests</h3>
          {["Spiritual & Temples", "Culture & Heritage", "Food & Culinary", "Photography", "Local Life & Markets", "Festivals & Events"].map((item)=><label key={item}><input type="checkbox"/><span>{item}</span></label>)}
        </div>
      </section>

      <section className="journey-stories" aria-labelledby="journey-stories-title">
        <div className="journey-stories-heading"><div><p className="journey-eyebrow">TRAVELLER STORIES</p><h2 id="journey-stories-title">Experiences that<br/><em>Stay Forever.</em></h2></div><p>Hear from travellers who experienced the real Varanasi with us.</p></div>
        <div className="journey-testimonial-grid">
          {testimonials.map((item)=><article className="journey-testimonial" key={item.author}>
            <div className="journey-testimonial-photo"><Image src={item.avatar} alt="" fill sizes="(max-width: 700px) 86vw, 28vw" /></div>
            <div className="journey-testimonial-quote"><span aria-hidden="true">“</span><blockquote>{item.quote}</blockquote><div className="journey-testimonial-person"><strong>{item.author}</strong><small>{item.location}</small></div></div>
          </article>)}
        </div>
      </section>

      <JourneyEnquiry />
    </div>
  );
}

function JourneyMapIllustration() {
  const stops = [
    { x: 17, y: 64, label: "Assi Ghat", anchor: "start", photo: "/SnS/assi-ghat.webp" },
    { x: 37, y: 47, label: "Dashashwamedh Ghat", anchor: "middle", photo: "/SnS/dashashwamedh-ghat.webp" },
    { x: 50, y: 29, label: "Kashi Vishwanath Mandir", anchor: "middle", photo: "/SnS/kashi-vishwanath.webp" },
    { x: 72, y: 18, label: "Sarnath", anchor: "middle", photo: "/SnS/sarnath.webp" },
    { x: 84, y: 61, label: "Ramnagar Fort", anchor: "end", photo: "/SnS/ramnagar-fort.webp" },
  ] as const;
  return <div className="journey-route-map" aria-label="Illustrated Kashi route map">
    <svg viewBox="0 0 100 82" role="img" aria-label="A route connecting five places in Kashi">
      <path className="journey-map-river" d="M8 76 C23 59 33 74 48 60 S70 49 93 57" />
      <path className="journey-map-route" d="M17 64 C23 59 29 52 37 47 S45 35 50 29 S65 21 72 18 M37 47 C50 47 65 50 84 61" />
      {stops.map((s,index)=>{
        const clipId = `journey-map-photo-${index}`;
        return <g key={s.label} className="journey-photo-stop">
          <defs><clipPath id={clipId}><circle cx={s.x} cy={s.y} r="5.1"/></clipPath></defs>
          <circle className="journey-photo-disc" cx={s.x} cy={s.y} r="5.8"/>
          <image href={s.photo} x={s.x - 5.1} y={s.y - 5.1} width="10.2" height="10.2" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${clipId})`}/>
          <circle className="journey-photo-ring" cx={s.x} cy={s.y} r="5.1"/>
          <text x={s.x} y={s.y - 7} textAnchor={s.anchor}>{s.label}</text>
        </g>;
      })}
      <path className="journey-map-temple" d="M79 78h14m-12 0V69h3v-5h4v5h3v9m-8-14 3-5 3 5m-4-10h2m-1-5v5" />
    </svg>
    <span className="journey-map-label"><MapPin size={13}/> VARANASI · KASHI</span>
  </div>;
}
