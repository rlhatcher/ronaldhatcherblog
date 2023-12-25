'use client'

import React from 'react'
import Link from 'next/link'
import CloudImage from './CloudImage'

export default function BuildList ({
  builds
}: {
  builds: Build[]
}): React.JSX.Element {
  return (
    <ul role='list' className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {builds.map((build) => {
        return (
          <Link href={`/builds/${build.meta.slug}`} key={build.meta.slug}>
            <li
              key={build.meta.slug}
              className='flex justify-between bg-slate-200 gap-x-6 py-5 px-5 mb-2  border-l-8 border-slate-400 rounded-sm'
            >
              <div className='flex min-w-0 gap-x-4 my-1'>
              <div className='relative h-24 w-24 flex-none bg-gray-50'>
                <CloudImage
                  className='absolute top-0 left-0 h-full w-full object-cover rounded-md'
                  image={build.meta.image}
                  height={96}
                  width={96}
                  crop='thumb'
                  zoom={false}
                  alt=''
                />
                </div>
                <div className='min-w-0 flex-auto'>
                  <p className='text-lg font-semibold leading-6 text-gray-900'>
                    {build.meta.title}
                  </p>
                  <p className='mt-1 wrap text-xs leading-5 text-gray-500'>
                    {build.meta.description}
                  </p>
                </div>
              </div>
            </li>
          </Link>
        )
      })}
    </ul>
  )
}
