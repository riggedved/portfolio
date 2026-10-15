import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { getSiteMetadata } from "@/sanity/lib/metadata";

export const dynamic = "force-dynamic";

interface SanitySlugItem {
  slug: string;
  _updatedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const meta = await getSiteMetadata();
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    meta.siteUrl ||
    "https://riggedved.dev";
  const baseUrl = rawSiteUrl.replace(/\/+$/, "");

  const now = new Date();

  // Core static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dev`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/uiux`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/art`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/film`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  // Dynamic routes from Sanity
  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const [uiuxProjects, artGalleries, musicAlbums, pdfBooks] =
      await Promise.all([
        client.fetch<SanitySlugItem[]>(
          `*[_type == "uiuxProject" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
        ),
        client.fetch<SanitySlugItem[]>(
          `*[_type == "artGallery" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
        ),
        client.fetch<SanitySlugItem[]>(
          `*[_type == "music" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
        ),
        client.fetch<SanitySlugItem[]>(
          `*[_type == "pdfBook" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
        ),
      ]);

    const uiuxRoutes: MetadataRoute.Sitemap = (uiuxProjects || []).map(
      (item) => ({
        url: `${baseUrl}/uiux/${item.slug}`,
        lastModified: item._updatedAt ? new Date(item._updatedAt) : now,
        changeFrequency: "monthly",
        priority: 0.8,
      })
    );

    // Fallback gallery if none exist yet in Sanity
    const galleryItems = [...(artGalleries || [])];
    if (!galleryItems.some((g) => g.slug === "untitled-room")) {
      galleryItems.push({ slug: "untitled-room" });
    }

    const galleryRoutes: MetadataRoute.Sitemap = galleryItems.map((item) => ({
      url: `${baseUrl}/art/gallery/${item.slug}`,
      lastModified: item._updatedAt ? new Date(item._updatedAt) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const musicRoutes: MetadataRoute.Sitemap = (musicAlbums || []).map(
      (item) => ({
        url: `${baseUrl}/art/music/${item.slug}`,
        lastModified: item._updatedAt ? new Date(item._updatedAt) : now,
        changeFrequency: "monthly",
        priority: 0.7,
      })
    );

    const bookRoutes: MetadataRoute.Sitemap = (pdfBooks || []).map((item) => ({
      url: `${baseUrl}/art/book/${item.slug}`,
      lastModified: item._updatedAt ? new Date(item._updatedAt) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    dynamicRoutes = [
      ...uiuxRoutes,
      ...galleryRoutes,
      ...musicRoutes,
      ...bookRoutes,
    ];
  } catch (error) {
    console.error("Error fetching dynamic routes for sitemap:", error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
