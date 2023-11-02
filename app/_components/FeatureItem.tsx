'use client'
import React from 'react'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'

export default function FeatureItem ({
  feature
}: {
  feature: Feature
}): React.JSX.Element {
  return (
    <Link
      key={feature.name}
      href={`/${feature.name}`}
      className='hover:underline'
    >
      <div className='flex flex-col cursor-pointer'>
        <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
          <CldImage
            alt={feature.name}
            className='h-6 w-6 flex-none rounded-full bg-white/10'
            height={48}
            width={48}
            src={feature.icon}
          />
        </dt>
        <dd className='relative isolate mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600'>
          <p className='flex-auto'>{feature.content}</p>
        </dd>
      </div>
    </Link>
  )
}
