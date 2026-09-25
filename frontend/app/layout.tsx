import type { Metadata } from "next";
import "./globals.css";
import "./editorial.css";
import "./refinement.css";
import "./luxury.css";
import "./experiences.css";
import "./about.css";
import "./journal.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: {
    default: "Private Journeys in Varanasi | Soil n Soul Travels",
    template: "%s | Soil n Soul Travels",
  },
  description:
    "Private journeys into the soul of Banaras. Thoughtfully designed around you, with a personal local concierge.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.soilnsoultravels.com",
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Soil N Soul Travels",
    images: [{ url: "/images/hero/hero-3.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
