import Link from "next/link";

// import MoreStories from "../../more-stories";

import { getAllBuilds } from "@/lib/api";
import BuildCard from "../_components/build-card";

export default async function BuildsPage() {
  const builds = await getAllBuilds(false);
  return (
    <div className="container mx-auto px-5">
      <section className="flex-col md:flex-row flex font-mono items-center md:justify-between mt-16 mb-4 md:mb-4">
        <h1 className="text-xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
          <Link href="/" className="hover:underline">Ω</Link>
          .
        </h1>
        <h2 className="text-center md:text-left text-xl mt-5 md:pl-8">
          Builds & Techniques
        </h2>
      </section>
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
