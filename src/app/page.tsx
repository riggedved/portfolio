import HeroSection from "../components/HeroSection";
import HighlightsSection from "../components/HighlightsSection";
import ExperienceSection from "../components/ExperienceSection";
import SkillStackSection from "../components/SkillStackSection";
import EducationSection from "../components/EducationSection";
import { client } from "../sanity/lib/client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [highlights, experiences, skills, education, problemSolvingData] = await Promise.all([
    client.fetch(`*[_type == "highlight"] | order(coalesce(rank, order, 999999) asc, _createdAt desc){
      _id,
      title,
      rank,
      mediaType,
      image,
      videoUrl,
      videoFile {
        asset->{
          url
        }
      },
      link
    }`).catch(() => []),
    client.fetch(`*[_type == "experience"] | order(order asc){
      _id, company, role, date, location, description, logo, link
    }`).catch(() => []),
    client.fetch(`*[_type == "skill"] | order(order asc){
      _id, category, skills
    }`).catch(() => []),
    client.fetch(`*[_type == "education"] | order(order asc){
      _id, institution, degree, date, cgpa, logo, link
    }`).catch(() => []),
    client.fetch(`*[_type == "problemSolving"] | order(coalesce(order, 1) asc){
      _id, platform, username, problemsSolved, contestRating, profileUrl, logo
    }`).catch(() => []),
  ]);

  const problemSolving = problemSolvingData && problemSolvingData.length > 0
    ? problemSolvingData
    : [
        {
          _id: "default-leetcode",
          platform: "LeetCode",
          username: "riggedved",
          problemsSolved: "500+ problems solved",
          contestRating: "1750+ rating",
          profileUrl: "https://leetcode.com/u/riggedved",
        },
      ];

  return (
    <>
      <HeroSection />
      <HighlightsSection highlights={highlights} />
      <ExperienceSection experiences={experiences} />
      <SkillStackSection skillCategories={skills} problemSolving={problemSolving} />
      <EducationSection education={education} />
    </>
  );
}
