import Link from "next/link";

import ProjectCards from "@/app/_components/ProjectCards";
import TopNav from "@/app/_components/top-nav";

export default async function ProjectPage() {

  return (
    <div className="container mx-auto px-5">
      <TopNav links={[
        { href: "/", label: "Ω" }]}
        page={{ title: "Projects" }} />
      <article>
        <div className="bg-gray-100 rounded-2xl py-4 sm:pt-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ProjectCards limit={30} />
          </div>
        </div>
      </article>
    </div>
  );
}
