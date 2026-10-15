import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Complete directory of all pages, projects, art galleries, music, and writing on Ved Saxena's portfolio.",
};

interface SimpleItem {
  title: string;
  slug: string;
  description?: string;
}

export default async function SitemapPage() {
  let uiuxProjects: SimpleItem[] = [];
  let artGalleries: SimpleItem[] = [];
  let musicAlbums: SimpleItem[] = [];
  let pdfBooks: SimpleItem[] = [];
  let resumePdfUrl: string | null = null;

  try {
    const [uiuxData, galleryData, musicData, bookData, settingsData] =
      await Promise.all([
        client.fetch<Array<{ title: string; slug: { current: string }; description?: string }>>(
          `*[_type == "uiuxProject" && defined(slug.current)] | order(coalesce(rank, 999999) asc, _createdAt asc){
            title,
            slug,
            description
          }`
        ),
        client.fetch<Array<{ title: string; slug: { current: string }; description?: string }>>(
          `*[_type == "artGallery" && defined(slug.current)] | order(_createdAt asc){
            title,
            slug,
            description
          }`
        ),
        client.fetch<Array<{ title: string; slug: { current: string }; genre?: string }>>(
          `*[_type == "music" && defined(slug.current)] | order(_createdAt desc){
            title,
            slug,
            genre
          }`
        ),
        client.fetch<Array<{ title: string; slug: { current: string } }>>(
          `*[_type == "pdfBook" && defined(slug.current)] | order(_createdAt desc){
            title,
            slug
          }`
        ),
        client.fetch<{ pdfUrl?: string } | null>(
          `*[_type == "siteSettings"][0]{
            "pdfUrl": resumePdf.asset->url
          }`
        ),
      ]);

    uiuxProjects = (uiuxData || []).map((p) => ({
      title: p.title,
      slug: p.slug.current,
      description: p.description,
    }));

    artGalleries = (galleryData || []).map((g) => ({
      title: g.title,
      slug: g.slug.current,
      description: g.description,
    }));

    // If fallback room isn't in Sanity yet, present it nicely
    if (!artGalleries.some((g) => g.slug === "untitled-room")) {
      artGalleries.push({
        title: "The Art Gallery Title",
        slug: "untitled-room",
        description: "Interactive virtual art exhibition room",
      });
    }

    musicAlbums = (musicData || []).map((m) => ({
      title: m.title,
      slug: m.slug.current,
      description: m.genre,
    }));

    pdfBooks = (bookData || []).map((b) => ({
      title: b.title,
      slug: b.slug.current,
    }));

    resumePdfUrl = settingsData?.pdfUrl ?? null;
  } catch (error) {
    console.error("Error loading sitemap details from Sanity:", error);
  }

  const sections = [
    {
      title: "Core Pages",
      description: "Primary landing and informational pages",
      links: [
        { label: "Home", href: "/", note: "Overview, highlights, experience, skills & problem solving" },
        { label: "About", href: "/about", note: "Background, timeline, ethos and story" },
        { label: "Contact", href: "/contact", note: "Direct message channels and social presence" },
        {
          label: "Resume",
          href: resumePdfUrl || "/resume",
          external: Boolean(resumePdfUrl),
          note: "Curriculum Vitae and professional history",
        },
      ],
    },
    {
      title: "Engineering & Products",
      description: "Software engineering, backend architectures, and UX case studies",
      links: [
        { label: "Dev Projects Index", href: "/dev", note: "Full-stack apps, systems, and open source" },
        { label: "UI/UX Index", href: "/uiux", note: "Product design case studies and user interfaces" },
        ...uiuxProjects.map((proj) => ({
          label: proj.title,
          href: `/uiux/${proj.slug}`,
          note: proj.description ? `${proj.description.slice(0, 70)}...` : "Interactive UI/UX project breakdown",
        })),
      ],
    },
    {
      title: "Cinema & Audio",
      description: "Filmmaking, music releases, and audiovisual experiments",
      links: [
        { label: "Films Index", href: "/film", note: "Short films, directing work & movie recommendations" },
        ...musicAlbums.map((album) => ({
          label: album.title,
          href: `/art/music/${album.slug}`,
          note: album.description ? `Music Album • ${album.description}` : "Original music album experience",
        })),
      ],
    },
    {
      title: "Art & Editorial",
      description: "Virtual gallery rooms, photography, written books, and articles",
      links: [
        { label: "Photography & Art", href: "/art", note: "Curated photography feed & visual studies" },
        { label: "Writing & Blogs", href: "/blogs", note: "Articles, technical writing, and essays" },
        ...artGalleries.map((gallery) => ({
          label: gallery.title,
          href: `/art/gallery/${gallery.slug}`,
          note: gallery.description || "Immersive 3D gallery exhibition",
        })),
        ...pdfBooks.map((book) => ({
          label: book.title,
          href: `/art/book/${book.slug}`,
          note: "Interactive realistic flipbook reader",
        })),
      ],
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "960px",
        margin: "0 auto",
        padding: "40px 20px 120px 20px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1
          className="instrument-serif"
          style={{
            fontSize: "clamp(3.2rem, 7vw, 5rem)",
            letterSpacing: "-0.04em",
            margin: "0 0 12px 0",
            lineHeight: 1,
            color: "var(--text-primary)",
          }}
        >
          <BlurredStagger text="site map" animateOnce />
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1rem",
            maxWidth: "600px",
            margin: "0 auto 24px auto",
            lineHeight: 1.5,
          }}
        >
          A comprehensive directory of all pages, case studies, galleries, and publications across the portfolio.
        </p>

        {/* Technical Feed Pill */}
        <style>{`
          .sitemap-card-item:hover {
            background: rgba(255, 255, 255, 0.06) !important;
            border-color: rgba(255, 255, 255, 0.15) !important;
            transform: translateY(-1px);
          }
        `}</style>
        <div style={{ display: "inline-flex", gap: "10px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 16px",
              borderRadius: "9999px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              background: "rgba(255, 255, 255, 0.04)",
              color: "var(--text-primary)",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
              transition: "all 0.2s ease",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#34C759",
              }}
            />
            XML Sitemap for Crawlers (/sitemap.xml) ↗
          </a>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 14px",
              borderRadius: "9999px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(255, 255, 255, 0.02)",
              color: "var(--text-secondary)",
              textDecoration: "none",
              fontSize: "0.85rem",
              transition: "all 0.2s ease",
            }}
          >
            robots.txt ↗
          </a>
        </div>
      </div>

      {/* Grid of Sections */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {sections.map((section) => (
          <div
            key={section.title}
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "20px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ marginBottom: "18px" }}>
              <h2
                style={{
                  fontSize: "1.4rem",
                  margin: "0 0 6px 0",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  fontWeight: 600,
                }}
              >
                {section.title}
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.88rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.4,
                }}
              >
                {section.description}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                flex: 1,
              }}
            >
              {section.links.map((link) => {
                const isExternal = Boolean("external" in link && link.external);
                const content = (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "10px 14px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.04)",
                      transition: "background 0.2s ease, border-color 0.2s ease, transform 0.15s ease",
                      cursor: "pointer",
                    }}
                    className="sitemap-card-item"
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 500,
                          fontSize: "1rem",
                          color: "var(--text-primary)",
                        }}
                      >
                        {link.label}
                      </span>
                      <span
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.8rem",
                          opacity: 0.7,
                        }}
                      >
                        {isExternal ? "↗" : "→"}
                      </span>
                    </div>
                    {link.note && (
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-secondary)",
                          marginTop: "4px",
                          lineHeight: 1.3,
                        }}
                      >
                        {link.note}
                      </span>
                    )}
                  </div>
                );

                return isExternal ? (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    key={link.href + link.label}
                    href={link.href}
                    style={{ textDecoration: "none" }}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
