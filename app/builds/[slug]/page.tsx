import { getBuildAndSteps } from "@/lib/api";
import { Build, Step } from "../../_types/types";
import Link from "next/link";
import StepCard from "../../_components/step-card";

export default async function BuildPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const build = await getBuildAndSteps(params.slug, false);

  return (
    <div className="container mx-auto px-5">
      <section className="flex-col md:flex-row flex font-mono items-center md:justify-between mt-16 mb-16 md:mb-12">
        <h1 className="text-xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
          <Link href="/" className="hover:underline">Ω</Link>
          .
          <Link href="/builds" className="hover:underline">
            Builds
          </Link>
          .
        </h1>
        <h2 className="text-center md:text-left text-xl mt-5 md:pl-8">
          {build.title}
        </h2>
      </section>
      <article>
        <div className="bg-gray-100 rounded-2xl py-4 sm:pt-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl lg:mx-0 ">
              <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
                  <div className="max-w-3xl">
                    <h2 id="features-heading" className="font-mono text-gray-500">
                      <Link
                        href={`/projects/${build.project.slug}`}
                        className="hover:underline"
                      >
                        {build.project?.title} Project
                      </Link>
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      {build.description}
                    </p>
                    <p className="mt-4 text-gray-500">{build.description}</p>
                  </div>
                  <StepCard
                    steps={build.stepCollection.items}
                    buildSlug={build.slug}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
