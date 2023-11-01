import React from 'react'
import Avatar from './avatar'
import Link from 'next/link'

export default function FeatureItem ({ feature }: { feature: Feature }): React.JSX.Element {
  return (
    <Link
      key={feature.name}
      href={`/${feature.name}`}
      className='hover:underline'
    >
      <div className='flex flex-col cursor-pointer'>
        <dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900'>
          <Avatar name={feature.name} picture={feature.icon} />
        </dt>
        <dd className='relative isolate mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600'>
          <p className='flex-auto'>{feature.content}</p>
        </dd>
      </div>
    </Link>
  )
}
