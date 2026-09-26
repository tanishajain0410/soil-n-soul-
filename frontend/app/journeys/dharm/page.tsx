import type { Metadata } from "next";
import JourneyCategoryPage from "@/components/journey/JourneyCategoryPage";
import { journeyCategories } from "@/data/journeyCategories";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Dharm — Spiritual Journeys in Varanasi | Soil n Soul",
  description:
    "Experience the spiritual soul of Kashi through its ancient temples, sacred ghats, timeless rituals and private Ganga Aarti ceremonies.",
  alternates: { canonical: "/journeys/dharm" },
  openGraph: {
    title: "Dharm — Spiritual Journeys in Varanasi | Soil n Soul",
    description:
      "A journey into faith, ritual and devotion in the sacred city of Varanasi.",
    images: [{ url: "/SnS/sacred-kashi.webp" }],
  },
};

export default function DharmPage() {
  const data = journeyCategories.dharm;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAction",
            name: "Dharm — Spiritual Journeys in Varanasi",
            description: data.heroDescription,
            provider: {
              "@type": "TravelAgency",
              name: "Soil n Soul Travels",
              url: "https://www.soilnsoultravels.com",
            },
          }),
        }}
      />
      <JourneyCategoryPage data={data} />
    </>
  );
}
