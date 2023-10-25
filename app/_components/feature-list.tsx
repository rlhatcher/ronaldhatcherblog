import React from 'react'
import Avatar from './avatar'
import Link from 'next/link'
import { type Feature } from '../_types/types'
interface FeatureListProps {
  features: Feature[]
}

export default function FeatureList ({ features }: FeatureListProps): React.JSX.Element {
  return (
    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
      {features.map((feature) => {
        return (
          <Link key={feature.name} href={`${feature.href}`} className="hover:underline">
            <div className="flex flex-col cursor-pointer">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Avatar name={feature.name} picture={feature.icon} />
              </dt>
              <dd className="relative isolate mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </div>
          </Link>
        )
      })}
    </dl>
  )
}
