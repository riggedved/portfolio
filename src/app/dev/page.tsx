import ProjectPageTemplate from "@/components/ProjectPageTemplate";
import { client } from "../../sanity/lib/client";
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
    return builder.image(source);
}

export const dynamic = 'force-dynamic';

export default async function DevPage() {
    const data = await client.fetch(`*[_type == "devProject"] | order(coalesce(rank, 999999) asc, _createdAt asc){
        _id, title, techStack, description, image, link, github
    }`);

    const devProjects = data.map((project: any) => ({
        id: project._id,
        title: project.title,
        techStack: project.techStack,
        description: project.description,
        imageUrl: project.image ? urlFor(project.image).width(600).url() : undefined,
        link: project.link,
        githubUrl: project.github,
    }));

    return (
        <ProjectPageTemplate
            title="dev projects"
            subtitle="some things i have worked real hard on."
            projects={devProjects}
        />
    );
}
