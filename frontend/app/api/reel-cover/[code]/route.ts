import { NextResponse } from "next/server";

const testimonialReels = new Set([
  "DbShNSGCVEi",
  "Dau_-F6qUIb",
  "DcyH-xLiZhJ",
]);

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;

  if (!testimonialReels.has(code)) {
    return new NextResponse("Unknown testimonial", { status: 404 });
  }

  const response = await fetch(`https://www.instagram.com/reel/${code}/embed/`, {
    headers: { "User-Agent": "Mozilla/5.0" },
    cache: "no-store",
  });

  if (!response.ok) {
    return new NextResponse("Reel cover unavailable", { status: 502 });
  }

  const html = await response.text();
  const marker = 'display_url\\":\\"';
  const start = html.indexOf(marker);

  if (start < 0) {
    return new NextResponse("Reel cover unavailable", { status: 502 });
  }

  const encodedUrl = html.slice(start + marker.length).split('"', 1)[0];
  const coverUrl = encodedUrl
    .replace(/\\+\//g, "/")
    .replace(/\\+u0025/g, "%")
    .replace(/\\+u0026/g, "&")
    .replace(/\\+$/, "");

  const coverResponse = await fetch(coverUrl, {
    headers: {
      Referer: "https://www.instagram.com/",
      "User-Agent": "Mozilla/5.0",
    },
    cache: "no-store",
  });

  if (!coverResponse.ok) {
    return new NextResponse("Reel cover unavailable", { status: 502 });
  }

  return new NextResponse(await coverResponse.arrayBuffer(), {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": coverResponse.headers.get("content-type") ?? "image/jpeg",
    },
  });
}
