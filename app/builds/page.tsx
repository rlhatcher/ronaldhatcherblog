import Link from "next/link";

// import MoreStories from "../../more-stories";

import { getAllBuilds } from "@/lib/api";
import BuildCard from "../_components/build-card";

export default async function BuildsPage() {
  const builds = await getAllBuilds(false);
  return (
    <div className="container mx-auto px-5">
      <section className="flex-col md:flex-row flex font-mono items-center md:justify-between mt-16 mb-16 md:mb-12">
        <h1 className="text-xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
          <Link href="/" className="hover:underline">
            Blog
          </Link>
          .
        </h1>
      </section>
      <article>
        <div className="bg-gray-100 rounded-2xl py-4 sm:pt-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl lg:mx-0 ">
              <h1 className="text-6xl md:text-6xl lg:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
                Builds & Techniques
              </h1>
              <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
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
