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
      <h2 className="text-2xl md:text-4xl font-mono font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <article>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
          Projects
        </h1>

        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard project={project} />
          ))}
        </div>
      </article>
    </div>
  );
}
