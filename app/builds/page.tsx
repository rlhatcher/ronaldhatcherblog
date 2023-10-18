import Link from "next/link";

// import MoreStories from "../../more-stories";

import { getAllBuilds } from "@/lib/api";
import BuildCard from "@/app/_components/build-card";
import TopNav from "../_components/top-nav";

export default async function BuildsPage() {
  const builds = await getAllBuilds(false);
  return (
    <div className="container mx-auto px-5">
      <TopNav links={[
                { href: "/", label: "Ω" }]}
              page={{ title: "Builds" }} />
      <article>
        <div className="bg-gray-100 rounded-2xl py-1 pt-4 px-4">
          Builds for most of my projects are here. Some projects have more than one stand-alone build and everything is linked up for convenience.
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl lg:mx-0 ">
              <div className="mx-auto mt-4 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-4 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                {builds.map((build) => (
                  <BuildCard build={build} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
