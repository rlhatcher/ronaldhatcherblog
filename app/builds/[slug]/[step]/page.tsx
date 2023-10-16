import CoverImage from "@/app/_components/cover-image";
import { Build, Step } from "../../../_types/types";
import Link from "next/link";
import { Markdown } from "@/lib/markdown";
import { getStep } from "@/lib/api";

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
      <section className="flex-col md:flex-row flex font-mono items-center md:justify-between mt-16 mb-16 md:mb-12">
        <h1 className="text-xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-8">
          <Link href="/" className="hover:underline">Ω</Link>
          .
          <Link href="/builds" className="hover:underline">
            Builds
          </Link>
          .
          <Link href={`/builds/${build.slug}`} className="hover:underline">
            {build.title.length > 6 ? build.title.substring(0, 6) + ".." : build.title}
          </Link>
          .
        </h1>
        <h2 className="text-center md:text-left text-xl mt-5 md:pl-8">
          {theStep.title}
        </h2>
      </section>
      <article>
        <div className="bg-gray-100 rounded-2xl py-4 sm:pt-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl lg:mx-0 ">

              <div className="max-w-2xl mx-auto">
                <div className="prose">
                  <Markdown content={theStep.content} />
                </div>
              </div>

              <div className="mb-8 md:mb-16 sm:mx-0">
                <CoverImage title={theStep.title} image={theStep.images[0]} />
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="prose">
                  <Markdown content={theStep.content} />
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
