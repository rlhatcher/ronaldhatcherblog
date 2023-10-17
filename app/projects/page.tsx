import Link from "next/link";
import { draftMode } from "next/headers";

// import MoreStories from "../../more-stories";
import Avatar from "../_components/avatar";
import Date from "../_components/date";

import { getAllProjects } from "@/lib/api";
import ProjectCard from "../_components/project-card";

export default async function ProjectPage() {
  const projects = await getAllProjects(false);
  return (
    <div className="container mx-auto px-5">
      <section className="flex-col md:flex-row flex font-mono items-center md:justify-between mt-2 mb-2 md:mb-2">
        <h1 className="text-xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8">
          <Link href="/" className="hover:underline">Ω</Link>
          .
        </h1>
        <h2 className="text-center md:text-left text-xl mt-2 md:pl-8">
          Projects
        </h2>
      </section>
      <article>
        <div className="bg-gray-100 rounded-2xl py-4 sm:pt-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl lg:mx-0 ">
              <div className="mx-auto mt-4 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {projects.map((project) => (
                  <ProjectCard project={project} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </article>
    </div>
  );
}
