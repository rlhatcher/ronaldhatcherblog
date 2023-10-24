import CoverImage from "@/app/_components/cover-image";
import { Build, Step } from "@/app/_types/types";
import Link from "next/link";
import { getStep } from "@/lib/api";
import TopNav from "@/app/_components/top-nav";

export default async function BuildStepPage({
  params,
}: {
  params: {
    slug: string;
    step: number;
  };
}) {
  const build = await getStep(params.slug, params.step, false);
  const theStep = build.stepCollection.items[0];
  return (
    <div className="container mx-auto px-5">
      <TopNav links={[
                { href: "/", label: "Ω" },
                { href: "/builds", label: "Builds" },
                { href: `/builds/${build.slug}`, label: build.title }]}
              page={{ title: theStep.title }} />
      <article>
        <div className="bg-gray-100 rounded-2xl py-4 sm:pt-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl lg:mx-0 ">

              <div className="max-w-2xl mx-auto">
                <div className="prose">
                  {/* <Markdown content={theStep.content} /> */}
                </div>
              </div>

              <div className="mb-8 md:mb-16 sm:mx-0">
                <CoverImage title={theStep.title} image={theStep.images[0]} />
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="prose">
                  {/* {content} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>{" "}
      <hr className="border-accent-2 mt-28 mb-24" />
    </div>
  );
}
