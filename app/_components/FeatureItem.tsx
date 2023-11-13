import React from 'react'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function FeatureItem ({
  feature
}: {
  feature: Feature
}): React.JSX.Element {
  return (
    <div className='flex flex-col cursor-pointer'>
      <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
        <CoverImage
          title={feature.name}
          slug={feature.name}
          image={feature.icon}
          className='h-8 w-8 flex-none bg-gray-50'
        />
        <h2 className='flex-auto text-xl font-semibold leading-7 text-gray-900'>
          {feature.title}
        </h2>
      </dt>
      <dd className='relative isolate mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600'>
        <Link
          key={feature.name}
          href={`/${feature.name}`}
          className='hover:underline'
        >
          <span className='absolute inset-0' />
          {feature.content}
        </Link>
      </dd>
    </div>
  )
}
