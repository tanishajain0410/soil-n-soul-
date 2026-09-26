import type { Metadata } from "next";
import JourneyCategoryPage from "@/components/journey/JourneyCategoryPage";
import { journeyCategories } from "@/data/journeyCategories";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Moksh — Wellness & Retreats in Varanasi | Soil n Soul",
  description:
    "Find stillness in the sacred energy of Varanasi through meditation, yoga, spiritual retreats and experiences that bring you closer to yourself.",
  alternates: { canonical: "/journeys/moksh" },
  openGraph: {
    title: "Moksh — Wellness & Retreats in Varanasi | Soil n Soul",
    description:
      "A journey towards stillness, inner peace and a higher purpose in Varanasi.",
    images: [{ url: "/images/journeys/moksh-hero.jpg" }],
  },
};

export default function MokshPage() {
  const data = journeyCategories.moksh;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAction",
            name: "Moksh — Wellness & Retreats in Varanasi",
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
