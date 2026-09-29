import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans, Alex_Brush } from "next/font/google";
import "./globals.css";
import "./editorial.css";
import "./refinement.css";
import "./luxury.css";
import "./experiences.css";
import "./experience-home-theme.css";
import "./experiences-approved-theme.css";
import "./about.css";
import "./about-home-theme.css";
import "./journal.css";
import "./blog-home-theme.css";
import "./journey-category.css";
import "./journey-home-theme.css";
import "./contact-home-theme.css";
import "./homepage-approved-theme.css";
import "./floating-contact.css";
import "./rounded-ctas.css";
import "./homepage-light-reference.css";
import "./site-home-unification.css";
import "./legal.css";
import SiteChrome from "@/components/SiteChrome";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cinzel",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-alex-brush",
});

const productionSiteUrl = "https://www.soilnsoultravels.com";
const resolvedSiteUrl =
  process.env.NODE_ENV === "production"
    ? (process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes("localhost")
        ? process.env.NEXT_PUBLIC_SITE_URL
        : productionSiteUrl)
    : (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");

export const metadata: Metadata = {
  title: {
    default: "Soil n Soul Travels",
    template: "Soil n Soul Travels",
  },
  description:
    "Private journeys into the soul of Banaras. Thoughtfully designed around you, with a personal local concierge.",
  metadataBase: new URL(resolvedSiteUrl),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Soil N Soul Travels",
    images: [{ url: "/images/hero/hero-3.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Journeys in Varanasi | Soil n Soul Travels",
    description:
      "Private journeys into the soul of Banaras. Thoughtfully designed around you, with a personal local concierge.",
    images: ["/images/hero/hero-3.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${plusJakarta.variable} ${alexBrush.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&text=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#f8f7f2] text-[#252520] antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
