import Link from "next/link";
import { Step } from "../_types/types";
import CoverImage from "./cover-image";
import { Markdown } from "@/lib/markdown";

interface StepProps {
  steps: Step[];
  buildSlug: string;
}

const StepCard: React.FC<StepProps> = ({ steps, buildSlug }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {steps.map((step) => (
            <Link
              key={step.step}
              href={`/builds/${buildSlug}/${step.step}`}
              className="group"
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <CoverImage
                  title={step.title}
                  image={step.images[0]}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-base text-gray-700">{step.title}</h3>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {step.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepCard;
