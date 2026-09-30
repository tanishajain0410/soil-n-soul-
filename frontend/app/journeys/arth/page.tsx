import type { Metadata } from "next";
import JourneyCategoryPage from "@/components/journey/JourneyCategoryPage";
import { journeyCategories } from "@/data/journeyCategories";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Arth — Heritage & Markets in Varanasi | SoilNSoul Travels",
  description:
    "Discover the artistic heart of Varanasi through its ancient markets, master artisans, Banarasi silk, architecture and living traditions.",
  alternates: { canonical: "/journeys/arth" },
  openGraph: {
    title: "Arth — Heritage & Markets in Varanasi | SoilNSoul Travels",
    description:
      "A journey through craft, culture and enduring legacy in the ancient city of Varanasi.",
    images: [{ url: "/images/journeys/arth-hero.jpg" }],
  },
};

export default function ArthPage() {
  const data = journeyCategories.arth;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAction",
            name: "Arth — Heritage & Markets in Varanasi",
            description: data.heroDescription,
            provider: {
              "@type": "TravelAgency",
              name: "SoilNSoul Travels",
              url: "https://soilnsoul.com",
            },
          }),
        }}
      />
      <JourneyCategoryPage data={data} />
    </>
  );
}
