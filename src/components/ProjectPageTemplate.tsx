import React from 'react';
import Link from 'next/link';
import { BlurredStagger } from './ui/blurred-stagger-text';

interface Project {
    id: string;
    title: string;
    techStack?: string;
    description?: string;
    imageUrl?: string;
    link?: string;
    githubUrl?: string;
}

interface ProjectPageTemplateProps {
    title: string;
    subtitle: string;
    projects: Project[];
    children?: React.ReactNode;
}

export default function ProjectPageTemplate({ title, subtitle, projects, children }: ProjectPageTemplateProps) {
    return (
        <div className="project-page-container">
            {(projects.length > 0 || children) && (
                <div className="project-page-header">
                    <h1 className="project-page-title"><BlurredStagger text={title} animateOnce /></h1>
                    <p className="project-page-subtitle">{subtitle}</p>
                </div>
            )}

            {children}

            {projects.length === 0 ? (
                <div style={{ marginTop: "120px", textAlign: "center", marginBottom: "80px" }}>
                    <h2 className="instrument-serif" style={{ fontSize: "8rem", color: "var(--text-primary)", letterSpacing: "-0.05em", margin: 0, lineHeight: 1 }}>
                        <BlurredStagger text="Coming soon." animateOnce />
                    </h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginTop: "16px", letterSpacing: "0.05em" }}>stay tuned</p>
                </div>
            ) : (
                <div className="project-list">
                    {projects.map((project) => {
                        const isInternalLink = project.link?.startsWith('/');
                        const titleLinkContent = (
                            <h3
                                className="project-list-title"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    margin: 0,
                                }}
                            >
                                <span>{project.title}</span>
                                <svg
                                    className="project-title-arrow"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{ display: "inline-block", flexShrink: 0 }}
                                >
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </h3>
                        );

                        return (
                            <div key={project.id} className="project-list-card">
                                <div className="project-list-image-placeholder">
                                    {project.imageUrl && (
                                        <img src={project.imageUrl} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    )}
                                </div>
                                <div className="project-list-info">
                                    <div className="project-list-header-row">
                                        {project.link ? (
                                            isInternalLink ? (
                                                <Link
                                                    href={project.link}
                                                    className="project-title-link"
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        textDecoration: "none",
                                                        color: "inherit",
                                                    }}
                                                >
                                                    {titleLinkContent}
                                                </Link>
                                            ) : (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-title-link"
                                                    style={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        textDecoration: "none",
                                                        color: "inherit",
                                                    }}
                                                >
                                                    {titleLinkContent}
                                                </a>
                                            )
                                        ) : (
                                            <h3 className="project-list-title" style={{ margin: 0 }}>{project.title}</h3>
                                        )}

                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-github-link"
                                                title="View GitHub Repository"
                                                aria-label={`View ${project.title} GitHub Repository`}
                                            >
                                                <svg
                                                    width="1.4rem"
                                                    height="1.4rem"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    style={{ width: "1.4rem", height: "1.4rem", display: "block" }}
                                                >
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                    {project.techStack && (
                                        <p className="project-list-tech-stack" style={{ color: "#ffffff" }}>
                                            {project.techStack}
                                        </p>
                                    )}
                                    {project.description && <p className="project-list-description">{project.description}</p>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
