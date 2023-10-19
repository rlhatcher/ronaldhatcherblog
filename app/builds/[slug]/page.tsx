import { getBuildAndSteps } from "@/lib/api";
import { Build, Step } from "@/app/_types/types";
import Link from "next/link";
import TopNav from "@/app/_components/top-nav";
import StepCard from "@/app/_components/step-card";

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
      <TopNav
        links={[
          { href: "/", label: "Ω" },
          { href: "/builds", label: "Builds" },
        ]}
        page={{ title: build.title }}
      />
      <article>
        <div className="bg-gray-100 rounded-2xl py-2 sm:pt-4">
          <div className="mx-auto max-w-3xl lg:mx-0 ">
            <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
              <div className="max-w-3xl">
                <h2 id="features-heading" className="font-mono text-gray-500">
                  <Link
                    href={`/projects/${build.project.slug}`}
                    className="hover:underline"
                  >
                    Project: {build.project?.title}
                  </Link>
                </h2>
                <p className="mt-4 mb-4 text-gray-500 font-mono">{build.description}</p>
              </div>
              <StepCard
                steps={build.stepCollection.items}
                buildSlug={build.slug}
              />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
