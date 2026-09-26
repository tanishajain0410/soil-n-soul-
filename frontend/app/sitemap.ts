import { journeys } from "@/data/journeys";
import type { MetadataRoute } from "next";
import { API_URL, SITE_URL } from "@/lib/constants";
import { fetchAllBlogSlugs } from "@/lib/api";
import { SERVICES } from "@/lib/services";
import { SEO_PAGES } from "@/lib/seo-pages";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

type BlogPost = {
  slug?: string;
  updatedAt?: string;
  createdAt?: string;
  status?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL + "/experiences",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: SITE_URL + "/journeys",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: SITE_URL + "/journeys/dharm",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: SITE_URL + "/journeys/arth",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: SITE_URL + "/journeys/kaam",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: SITE_URL + "/journeys/moksh",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...journeys.map((j) => ({
      url: SITE_URL + "/journeys/" + j.slug,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE_URL}/best-tours-and-travel-agency-in-varanasi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const seoRoutes: MetadataRoute.Sitemap = Object.keys(SEO_PAGES).map(
    (slug) => ({
      url: `${SITE_URL}/travel/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const slugs = await fetchAllBlogSlugs();
    blogRoutes = slugs.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    // Ignore API errors to keep sitemap resilient.
  }

  return [...staticRoutes, ...serviceRoutes, ...seoRoutes, ...blogRoutes];
}
