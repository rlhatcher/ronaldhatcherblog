import Link from "next/link";
import { draftMode } from "next/headers";

// import MoreStories from "../../more-stories";
import Avatar from "@/app/_components/avatar";
import Date from "@/app/_components/date";

import { getAllProjects } from "@/lib/api";
import ProjectCard from "@/app/_components/project-card";
import TopNav from "@/app/_components/top-nav";

export default async function ProjectPage() {
  const projects = await getAllProjects(false);
  return (
    <div className="container mx-auto px-5">
      <TopNav links={[
                { href: "/", label: "Ω" }]}
              page={{ title: "Projects" }} />
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
