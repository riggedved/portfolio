"use client";

import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface SkillCategory {
  _id: string;
  category: string;
  skills: string[];
}

export interface ProblemSolvingProfile {
  _id: string;
  platform?: string;
  username: string;
  problemsSolved?: string;
  contestRating?: string;
  profileUrl?: string;
  logo?: SanityImageSource;
}

type SkillStackSectionProps = {
  skillCategories?: SkillCategory[];
  problemSolving?: ProblemSolvingProfile[];
};

export default function SkillStackSection({
  skillCategories = [],
  problemSolving = [],
}: SkillStackSectionProps) {
  if (skillCategories.length === 0 && problemSolving.length === 0) return null;

  return (
    <section className="skill-stack-section">
      <h2 className="section-title">skill stack</h2>

      <div className="skills-container">
        {/* Problem Solving Subheading (at the top of all skills) */}
        {problemSolving && problemSolving.length > 0 && (
          <div className="skill-category problem-solving-category">
            <h3
              className="category-title"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="var(--capsule-bg)"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
              problem solving
            </h3>

            <div className="problem-solving-list" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {problemSolving.map((item) => {
                const linkHref = item.profileUrl || (item.username ? `https://leetcode.com/u/${item.username.replace(/^@/, '')}` : undefined);

                return (
                  <div key={item._id} className="experience-item problem-solving-card">
                    <div
                      className="experience-avatar"
                      style={{
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "6px",
                        backgroundColor: "#1e1e1e",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      {item.logo ? (
                        <img
                          src={urlFor(item.logo).width(64).url()}
                          alt={`${item.platform || "LeetCode"} logo`}
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                      ) : (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-label="LeetCode logo"
                        >
                          <path
                            d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.247 2.176 5.877 2.12 8.082-.125l5.242-5.337a1.374 1.374 0 0 0-.022-1.947 1.378 1.378 0 0 0-1.95.022l-5.24 5.333a3.176 3.176 0 0 1-4.407.069l-4.27-4.186a3.17 3.17 0 0 1-.822-1.745 3.125 3.125 0 0 1 .09-.99 3.067 3.067 0 0 1 .655-1.393l3.87-4.14 5.399-5.783A1.377 1.377 0 0 0 13.483 0zm-2.88 7.218a1.376 1.376 0 0 0-.987.422l-3.77 3.873a1.378 1.378 0 0 0 .02 1.95 1.378 1.378 0 0 0 1.95-.02l3.77-3.873a1.376 1.376 0 0 0-.983-2.352z"
                            fill="#FFA116"
                          />
                          <path
                            d="M5.116 13.04a1.377 1.377 0 0 0-.974.403 1.377 1.377 0 0 0 0 1.948l13.75 13.75a1.377 1.377 0 0 0 1.948 0 1.377 1.377 0 0 0 0-1.948L6.09 13.443a1.377 1.377 0 0 0-.974-.403z"
                            fill="#B3B1B0"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="experience-content">
                      <div className="experience-header">
                        <div className="experience-info">
                          <h3
                            className="company-name"
                            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                          >
                            {linkHref ? (
                              <a
                                href={linkHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="problem-solving-handle-link"
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  color: "inherit",
                                  textDecoration: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <span>{item.username}</span>
                                <svg
                                  className="handle-arrow-icon"
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
                              </a>
                            ) : (
                              <span>{item.username}</span>
                            )}
                          </h3>
                          <p
                            className="role-name"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              flexWrap: "wrap",
                              marginTop: "4px",
                            }}
                          >
                            {item.problemsSolved && <span>{item.problemsSolved}</span>}
                            {item.problemsSolved && item.contestRating && (
                              <span style={{ opacity: 0.4 }}>•</span>
                            )}
                            {item.contestRating && <span>{item.contestRating}</span>}
                          </p>
                        </div>
                        <div className="experience-date">
                          <div>{item.platform || "LeetCode"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {skillCategories.map((sc) => (
          <div key={sc._id} className="skill-category">
            <h3
              className="category-title"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="var(--capsule-bg)"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
              {sc.category}
            </h3>
            <div className="skill-pills">
              {sc.skills?.map((skill, index) => (
                <div key={index} className="skill-pill">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
