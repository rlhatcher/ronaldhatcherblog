import FeatureList from "./feature-list";

interface Feature {
  name: string;
  description: string;
  icon: React.ElementType;
  href: string;
}

export default function FeatureSection({features}: {features: Feature[]}) {
  return (
    <div className="bg-gray-100 rounded-2xl py-4 sm:pt-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:mx-0 ">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Resources for rockets, robots and ... something else that starts
            with an R
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Welcome to my (semi) structured repository of projects and
            explorations I've undertaken and am undertaking. I have grouped
            things around projects and builds to give those perspectives with
            general thoughts and documents grouped separately but linked to the
            projects and builds they relate to.
          </p>
        </div>
        <div className="mx-auto max-w-2xl sm:mt-4 lg:mt-6 lg:max-w-none">
          <FeatureList features={features} />
        </div>
      </div>
    </div>
  );
}
