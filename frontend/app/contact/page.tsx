import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Design My Journey",
  description:
    "Get in touch with SoilNSoul Travels for authentic Varanasi experiences. Reach us via WhatsApp, email, or drop by our office.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://soilnsoul.com/contact#webpage",
    url: "https://soilnsoul.com/contact",
    name: "Contact SoilNSoul Travels",
    description:
      "Contact page of SoilNSoul Travels. Design a personalised journey through the culture, stays, and sacred traditions of Kashi.",
    mainEntity: {
      "@type": "TravelAgency",
      name: "SoilNSoul Travels",
      telephone: "+919580417547",
      email: "info@soilnsoultravels.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Assi Ghat Road",
        addressLocality: "Varanasi",
        addressRegion: "Uttar Pradesh",
        postalCode: "221005",
        addressCountry: "IN",
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://soilnsoul.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: "https://soilnsoul.com/contact",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactClient />
    </>
  );
}
