import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About SoilNSoul Travels | Our Story",
  description:
    "Meet Anchal Pandey, founder and native of Banaras, and discover the values behind our private journeys in Kashi.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: "https://www.soilnsoultravels.com/about",
            name: "About SoilNSoul Travels",
            mainEntity: {
              "@type": "Person",
              name: "Anchal Pandey",
              jobTitle: "Founder",
              image: "https://www.soilnsoultravels.com/images/founder.jpg",
              worksFor: {
                "@type": "TravelAgency",
                name: "SoilNSoul Travels",
              },
            },
          }),
        }}
      />
      <AboutClient />
    </>
  );
}
