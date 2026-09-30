import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: { absolute: "SoilNSoul Travels" },
  description:
    "Curated Varanasi experiences, soulful stays and deeply personal journeys in the world's oldest living city.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const travelAgencySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://soilnsoul.com/#agency",
        name: "SoilNSoul Travels",
        url: "https://soilnsoul.com",
        logo: "https://soilnsoul.com/soil-n-soul-logo.svg",
        image: "https://soilnsoul.com/images/hero/hero-3.jpg",
        description:
          "Thoughtfully curated Varanasi experiences, soulful stays and personal journeys with a local concierge.",
        telephone: "+919580417547",
        priceRange: "Premium curated experiences",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Assi Ghat Road",
          addressLocality: "Varanasi",
          addressRegion: "Uttar Pradesh",
          postalCode: "221005",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "25.2899",
          longitude: "83.0076",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
        sameAs: [
          "https://www.instagram.com/soilnsoultravels",
          "https://wa.me/919580417547",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://soilnsoul.com/#website",
        url: "https://soilnsoul.com",
        name: "SoilNSoul Travels",
        description: "Plan your Varanasi journey with SoilNSoul Travels.",
        publisher: {
          "@id": "https://soilnsoul.com/#agency",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema) }}
      />
      <HomeClient />
    </>
  );
}
