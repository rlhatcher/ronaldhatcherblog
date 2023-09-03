import React from 'react';
import Avatar from './avatar';
import Link from 'next/link';

interface Feature {
  name: string;
  description: string;
  href: string;
  icon: {
    url: string;
  };
}

interface FeatureListProps {
  features: Feature[];
}

function FeatureList({ features }: FeatureListProps) {
  return (
    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
      {features.map((feature) => {
        return (
          <div key={feature.name} className="flex flex-col">
            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
              <Avatar name={feature.name} picture={feature.icon} />
            </dt>
            <dd className="relative isolate mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
              <p className="flex-auto">{feature.description}</p>
              <p className="mt-2">
                <Link href={`/features${feature.href}`} className="hover:underline">
                  <span className="absolute inset-0" />
                  Go There
                </Link>
              </p>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

export default FeatureList;
