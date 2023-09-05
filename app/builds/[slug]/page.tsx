import { getBuildAndSteps } from "@/lib/api";
import { Build, Step } from "../../../types";
import Link from "next/link";

export default async function BuildPage(slug: string) {
  const build = await getBuildAndSteps(slug, false);

  return (
    <div className="container mx-auto px-5">
      <h2 className="text-2xl md:text-4xl font-mono font-bold tracking-tight md:tracking-tighter leading-tight mb-10 mt-8">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
          <div className="max-w-3xl">
            <h2 id="features-heading" className="font-medium text-gray-500">
              {build.project?.title}
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {build.description}
            </p>
            <p className="mt-4 text-gray-500">{build.description}</p>
          </div>

          <div className="mt-11 grid grid-cols-1 items-start gap-x-6 gap-y-16 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            {build.stepCollection.items.map((step) => (
              <div key={step.step} className="flex flex-col-reverse">
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">
                    {step.step}. {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {step.description}
                  </p>
                </div>
                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={step.images[0].url}
                    alt=""
                    className="object-cover object-center"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
