import { Metadata } from "next";
import { fetchBlogs } from "@/lib/api";
import BlogClient from "./BlogClient";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "The Soul Blog - Stories from Kashi",
  alternates: { canonical: "/blog" },
  description:
    "Curated essays, cultural dispatches, and inner reflections from the ancient streets of Varanasi by SoilNSoul Travels.",
};

export default async function BlogPage() {
  const blogs = await fetchBlogs();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://www.soilnsoultravels.com/blog#webpage",
    url: "https://www.soilnsoultravels.com/blog",
    name: "Varanasi Travel Blog — Stories from Kashi",
    description:
      "Curated essays, cultural dispatches, and spiritual reflections from the ancient streets of Varanasi by SoilNSoul Travels.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.soilnsoultravels.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://www.soilnsoultravels.com/blog",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogClient posts={blogs} />
    </>
  );
}
