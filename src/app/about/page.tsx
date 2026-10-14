import Image from "next/image";
import InteractiveAvatar from "../../components/ui/InteractiveAvatar";
import { BlurredStagger } from "../../components/ui/blurred-stagger-text";
import { client } from "../../sanity/lib/client";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
    return builder.image(source);
}

const ptComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <img
                    alt={value.alt || ' '}
                    loading="lazy"
                    src={urlFor(value).width(800).fit('max').auto('format').url()}
                    style={{ width: '100%', borderRadius: '12px', marginTop: '16px', marginBottom: '16px' }}
                />
            );
        },
    },
};

export const dynamic = 'force-dynamic';

export default async function About() {
    const data = await client.fetch(`*[_type == "aboutPage"][0]{
        aboutDescription
    }`);
    return (
        <div className="about-page">
            <div className="hero-section">
                <div className="hero-name-curve who-am-i-curve">
                    <svg width="280" height="150" viewBox="0 0 280 150" className="curve-svg">
                        <path id="curve-about" d="M 60,140 A 80,80 0 0,1 220,140" fill="transparent" />
                        <text fill="var(--text-primary)" className="instrument-serif" fontSize="46" textAnchor="middle" letterSpacing="-0.07em">
                            <textPath href="#curve-about" startOffset="50%">
                                Who am i?
                            </textPath>
                        </text>
                    </svg>
                </div>

                <div className="hero-avatar about-avatar">
                    <InteractiveAvatar priority={true} />
                </div>

                <h1 className="about-title"><BlurredStagger text="about me" /></h1>

                <div className="about-content" style={{ width: "100%", maxWidth: "600px", marginInline: "auto", textAlign: "left" }}>
                    {data?.aboutDescription ? (
                        <PortableText value={data.aboutDescription} components={ptComponents} />
                    ) : (
                        <>
                            <p>
                                hey, my name is Ved and i build backends, write things people find on google, and make short films. final year btech cs student in noida, open to sde, backend and growth roles.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
