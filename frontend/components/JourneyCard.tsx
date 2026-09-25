import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { journeys } from "@/data/journeys";

export default function JourneyCard({
  journey: j,
}: {
  journey: (typeof journeys)[number];
}) {
  const location = j.slug === "varanasi-ayodhya"
    ? "Varanasi · Ayodhya"
    : j.slug === "varanasi-sarnath"
      ? "Varanasi · Sarnath"
      : "Varanasi";

  return (
    <article className="journey-cinematic-card">
      <Link href={`/journeys/${j.slug}`} className="journey-card-link" aria-label={`${j.name}: ${j.description}`}>
        <span className="journey-card-image">
          <Image
            src={j.image}
            alt={`From our Kashi collection: ${j.mood}`}
            fill
            sizes="(max-width:700px) 92vw, (max-width:1000px) 47vw, 24vw"
          />
        </span>
        <span className="journey-card-overlay" />
        <span className="journey-card-copy">
          <span className="journey-card-category">{j.category}</span>
          <strong className="journey-card-title">{j.name}</strong>
          <span className="journey-card-description">{j.description}</span>
          <span className="journey-card-meta">
            <span><Clock3 size={13} />{j.duration}</span>
            <span><MapPin size={13} />{location}</span>
          </span>
        </span>
        <span className="journey-card-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
      </Link>
    </article>
  );
}
