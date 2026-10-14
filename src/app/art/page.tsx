import { client } from "../../sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const dynamic = "force-dynamic";

type ArtPhoto = {
  _id: string;
  title?: string;
  image: SanityImageSource;
  instagramPostUrl?: string;
  aspectRatio?: "portrait" | "square" | "circle" | "landscape" | "auto";
};

type SiteSettingsData = {
  instagram?: string;
  instagramHandle?: string;
  instagramProfileImage?: SanityImageSource;
};

export default async function ArtPage() {
  const [settings, photos] = await Promise.all([
    client.fetch<SiteSettingsData | null>(
      `*[_type == "siteSettings"][0]{ instagram, instagramHandle, instagramProfileImage }`
    ).catch(() => null),
    client.fetch<ArtPhoto[]>(
      `*[_type == "art"] | order(coalesce(order, 999999) asc, _createdAt desc){
        _id,
        title,
        image,
        instagramPostUrl,
        aspectRatio
      }`
    ).catch(() => []),
  ]);

  const rawHandle = settings?.instagramHandle?.trim() || "riggedved";
  const instagramHandle = rawHandle.replace(/^@/, "");
  const instagramUrl =
    settings?.instagram?.trim() || `https://instagram.com/${instagramHandle}`;

  const profileImgUrl = settings?.instagramProfileImage
    ? urlFor(settings.instagramProfileImage).width(400).height(400).auto("format").quality(90).url()
    : "/avatar.png";

  return (
    <div className="project-page-container art-page">
      <style>{`
        .art-profile-avatar-wrap {
          width: 122px !important;
          height: 122px !important;
          border-radius: 50% !important;
          overflow: hidden !important;
          display: block !important;
          margin: 0 auto !important;
          position: relative !important;
        }
        .art-profile-avatar-img {
          width: 100% !important;
          height: 100% !important;
          border-radius: 50% !important;
          object-fit: cover !important;
          display: block !important;
        }
        .art-profile-handle-wrap {
          margin: 0 !important;
          font-size: 1.1rem !important;
          font-weight: 400 !important;
          line-height: 1.4 !important;
        }
        .art-profile-handle-link {
          font-size: 1.1rem !important;
          font-weight: 400 !important;
          font-family: inherit !important;
        }
        .art-profile-handle-text {
          font-weight: 400 !important;
          font-size: 1.1rem !important;
          font-family: inherit !important;
        }
        .art-photo-grid {
          column-count: 2 !important;
          column-gap: 20px !important;
          width: 100% !important;
          margin-bottom: 80px !important;
          display: block !important;
        }
        @media (min-width: 900px) {
          .art-photo-grid {
            column-count: 3 !important;
            column-gap: 24px !important;
          }
        }
        @media (max-width: 560px) {
          .art-photo-grid {
            column-count: 1 !important;
            column-gap: 16px !important;
          }
        }
        .art-photo-link,
        .art-photo-item {
          display: block !important;
          width: 100% !important;
          break-inside: avoid !important;
          -webkit-column-break-inside: avoid !important;
          page-break-inside: avoid !important;
          margin-bottom: 20px !important;
        }
        .art-photo-card {
          width: 100% !important;
          break-inside: avoid !important;
          -webkit-column-break-inside: avoid !important;
          page-break-inside: avoid !important;
        }
        .art-photo-img-wrap {
          width: 100% !important;
          aspect-ratio: auto !important;
        }
        .art-photo-img {
          width: 100% !important;
          height: auto !important;
          display: block !important;
          object-fit: cover !important;
        }
        .art-photo-card--square .art-photo-img-wrap {
          aspect-ratio: 1 / 1 !important;
        }
        .art-photo-card--square .art-photo-img {
          height: 100% !important;
        }
        .art-photo-card--circle .art-photo-img-wrap {
          aspect-ratio: 1 / 1 !important;
          border-radius: 50% !important;
          overflow: hidden !important;
        }
        .art-photo-card--circle .art-photo-img {
          height: 100% !important;
          border-radius: 50% !important;
        }
        .art-photo-card:hover .art-photo-img {
          transform: none !important;
        }
      `}</style>

      {/* Centered Instagram Profile Header */}
      <div
        className="art-profile-header"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          margin: "1.5rem auto 2.5rem auto",
          gap: "14px",
        }}
      >
        {/* Photo is static, not clickable */}
        <div
          className="art-profile-avatar-wrap"
          style={{
            width: "122px",
            height: "122px",
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            margin: "0 auto",
          }}
        >
          <img
            src={profileImgUrl}
            alt={instagramHandle}
            width={122}
            height={122}
            className="art-profile-avatar-img"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Handle below is the clickable link to the Instagram page */}
        <h1 className="art-profile-handle-wrap" style={{ margin: 0, fontSize: "1.1rem", fontWeight: 400, lineHeight: 1.4 }}>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="art-profile-handle-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--text-primary)",
              textDecoration: "none",
              padding: "6px 14px",
              borderRadius: "9999px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              background: "rgba(255, 255, 255, 0.03)",
              fontSize: "1.1rem",
              fontWeight: 400,
              fontFamily: "inherit",
            }}
          >
            <span className="art-profile-handle-text" style={{ fontWeight: 400, fontSize: "1.1rem", fontFamily: "inherit" }}>
              @{instagramHandle}
            </span>
            <svg
              className="art-profile-handle-arrow"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </h1>
      </div>

      {/* Photos Grid */}
      {photos.length > 0 ? (
        <div className="art-photo-grid">
          {photos.map((photo) => {
            if (!photo.image) return null;
            const imgUrl = urlFor(photo.image).width(1000).auto("format").quality(85).url();
            const hasTitle = Boolean(photo.title && photo.title.trim());

            const cardContent = (
              <div className={`art-photo-card art-photo-card--${photo.aspectRatio || "portrait"}`}>
                <div className="art-photo-img-wrap">
                  <img
                    src={imgUrl}
                    alt={photo.title || "Photo"}
                    loading="lazy"
                    className="art-photo-img"
                  />
                  {photo.instagramPostUrl && (
                    <div className="art-photo-hover-badge">
                      <span>View on Instagram</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
                {hasTitle && (
                  <p className="art-photo-caption">{photo.title}</p>
                )}
              </div>
            );

            return photo.instagramPostUrl ? (
              <a
                key={photo._id}
                href={photo.instagramPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="art-photo-link"
              >
                {cardContent}
              </a>
            ) : (
              <div key={photo._id} className="art-photo-item">
                {cardContent}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="art-empty-state">
          <div className="art-empty-icon">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-secondary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <h3 className="art-empty-title">photos coming soon</h3>
          <p className="art-empty-desc">
            You can upload photos in Sanity Studio at <a href="/studio">/studio</a> under <strong>Photos &amp; Art</strong>!
          </p>
        </div>
      )}
    </div>
  );
}
