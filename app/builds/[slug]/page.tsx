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
      <h2 className="text-2xl md:text-4xl font-mono font-bold tracking-tight md:tracking-tighter leading-tight mb-10 mt-8">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <article>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none text-center md:text-left">
          {build.title}
        </h1>
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
      </article>
    </div>
  );
}
