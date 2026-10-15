import type { MetadataRoute } from "next";
import { getSiteMetadata } from "@/sanity/lib/metadata";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const meta = await getSiteMetadata();
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    meta.siteUrl ||
    "https://riggedved.dev";
  const baseUrl = rawSiteUrl.replace(/\/+$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
