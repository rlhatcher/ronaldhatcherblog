import Link from "next/link";
import { draftMode } from "next/headers";

import MoreStories from "../../_components/more-stories";
import Avatar from "../../_components/avatar";
import Date from "../../_components/date";
import CoverImage from "../../_components/cover-image";

import { Markdown } from "@/lib/markdown";
import { getAllProjects, getProject} from "@/lib/api";

export async function generateStaticParams() {
  const allProjects = await getAllProjects(false);

  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { project } = await getProject(params.slug, false);

  return (
    <div className="container mx-auto px-5">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
        <Link href="/projects" className="hover:underline">
          Projects
        </Link>
        .
      </h2>
      <article>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
          {project.title}
        </h1>
        <div className="hidden md:block md:mb-12">
          {project.author && (
            <Avatar name={project.author.name} picture={project.author.picture} />
          )}
        </div>
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={project.title} image={project.images[0]} />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="block md:hidden mb-6">
            {project.author && (
              <Avatar name={project.author.name} picture={project.author.picture} />
            )}
          </div>
          <div className="mb-6 text-lg">
            {/* <Date dateString={project.date} /> */}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="prose">
            <Markdown content={project.overview} />
          </div>
        </div>
      </article>
      <hr className="border-accent-2 mt-28 mb-24" />
      {/* <MoreStories morePosts={morePosts} /> */}
    </div>
  );
}