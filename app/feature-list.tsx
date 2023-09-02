import Link from "next/link";
import React from "react";

interface Feature {
  name: string;
  description: string;
  icon: React.ElementType;
  href: string;
}

interface FeatureListProps {
  features: Feature[];
}

function FeatureList({ features }: FeatureListProps) {
  return (
    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
      {features.map((feature) => (
        <div key={feature.name} className="flex flex-col">
          <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
            <feature.icon
              className="h-5 w-5 flex-none text-indigo-600"
              aria-hidden="true"
            />
            {feature.name}
          </dt>
          <dd className="relative isolate mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
            <p className="flex-auto">{feature.description}</p>
            <p className="mt-2">
              <Link href={feature.href} className="hover:underline">
                <span className="absolute inset-0" />
                Go There
              </Link>
            </p>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default FeatureList;
