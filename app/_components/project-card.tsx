import Link from "next/link";
import CoverImage from "./cover-image";

import { Project, ProjectCardProps } from "../_types/types";

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      key={project.slug}
      className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
    >
      <CoverImage
        title={project.title}
        slug={project.slug}
        image={project.images[0]}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        {/* Do I need a date? */}
        <div className="-ml-4 flex items-center gap-x-4">
          <svg
            viewBox="0 0 2 2"
            className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          <div className="flex gap-x-2.5">
            {/* Do I need an Avatar? */}
          </div>
        </div>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
        <Link href={`/projects/${project.slug}`} className="hover:underline">
          <span className="absolute inset-0" />
          {project.title}
        </Link>
      </h3>
    </article>
  );
}

export default ProjectCard;