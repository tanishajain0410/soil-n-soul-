import type { Metadata } from "next";
import JourneyCategoryPage from "@/components/journey/JourneyCategoryPage";
import { journeyCategories } from "@/data/journeyCategories";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kaam — Love & Leisure in Varanasi | SoilNSoul Travels",
  description:
    "Experience the romantic, vibrant and soulful side of Kashi — from golden sunsets and serene boat rides to food, music and timeless moments together.",
  alternates: { canonical: "/journeys/kaam" },
  openGraph: {
    title: "Kaam — Love & Leisure in Varanasi | SoilNSoul Travels",
    description:
      "A journey of beauty, connection and the joy of living in Varanasi.",
    images: [{ url: "/images/purushartha-kaam.jpg" }],
  },
};

export default function KaamPage() {
  const data = journeyCategories.kaam;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAction",
            name: "Kaam — Love & Leisure in Varanasi",
            description: data.heroDescription,
            provider: {
              "@type": "TravelAgency",
              name: "SoilNSoul Travels",
              url: "https://www.soilnsoultravels.com",
            },
          }),
        }}
      />
      <JourneyCategoryPage data={data} />
    </>
  );
}
