import type { Metadata } from "next";
import ExperiencesClient from "./ExperiencesClient";

export const metadata: Metadata = {
  title: "Experiences, Curated Around You — Varanasi | SoilNSoul Travels",
  description:
    "Beyond sightseeing, we design immersive, private and meaningful experiences that reveal the real soul of Varanasi — Sacred Kashi, Living Banaras, Taste of Kashi, Hidden Banaras, Celebrations and Photography Journeys.",
  alternates: { canonical: "/experiences" },
  openGraph: {
    title: "Experiences, Curated Around You — Varanasi | SoilNSoul Travels",
    description:
      "Beyond sightseeing, we design immersive, private and meaningful experiences that reveal the real soul of Varanasi.",
    images: [{ url: "/images/varanasi-hero-main.jpg" }],
  },
};

export default function ExperiencesPage() {
  return <ExperiencesClient />;
}
