import Link from "next/link";
import { draftMode } from "next/headers";

import MoreStories from "@/app/_components/more-stories";
import Avatar from "@/app/_components/avatar";
import TopNav from "@/app/_components/top-nav";
import Date from "@/app/_components/date";
import CoverImage from "@/app/_components/cover-image";

import { Markdown } from "@/lib/markdown";
import { getAllProjects, getProject } from "@/lib/api";

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
      <TopNav links={[
                { href: "/", label: "Ω" },
                { href: "/projects", label: "Projects" }]}
              page={{ title: project.title }} />
      <article>
        <div className="bg-gray-100 rounded-2xl py-4 sm:pt-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl lg:mx-0 ">
              <h1 className="text-6xl md:text-6xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-4 text-center md:text-left">

              </h1>
              <div className="hidden md:block md:mb-4">
                {project.author && (
                  <Avatar name={project.author.name} picture={project.author.picture} />
                )}
              </div>
              <div className="mb-8 md:mb-4 sm:mx-0">
                <CoverImage title={project.title} image={project.images[0]} />
              </div>
              <div className="max-w-2xl mx-auto">
                <div className="block md:hidden mb-6">
                  {project.author && (
                    <Avatar name={project.author.name} picture={project.author.picture} />
                  )}
                </div>
                <div className="mb-4 text-lg">
                  {/* <Date dateString={project.date} /> */}
                </div>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="prose">
                  <Markdown content={project.overview} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <hr className="border-accent-2 mt-28 mb-24" />
      {/* <MoreStories morePosts={morePosts} /> */}
    </div>
  );
}
