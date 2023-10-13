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
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
        <Link href="/builds" className="hover:underline">
          Builds
        </Link>
        .
      </h2>
      <article>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
          {theStep.title}
        </h1>

        <div className="max-w-2xl mx-auto">
          <div className="prose">
            {/* <Markdown content={theStep.description} /> */}
            {theStep.description}
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
      </article>{" "}
      <hr className="border-accent-2 mt-28 mb-24" />
    </div>
  );
}
