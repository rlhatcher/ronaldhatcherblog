'use client'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import React from 'react'
import Link from 'next/link'
import CoverImage from '@/app/_components/cover-image'

interface Props {
  step: Step
  build: string
}

export default function StepCard ({ step, build }: Props): React.JSX.Element {
  const tags = step.meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ))
  return (
    <li
      key={step.meta.slug}
      className='relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6'
    >
      <div className='flex min-w-0 gap-x-4'>
        <CoverImage
          title={step.meta.title}
          slug={step.meta.slug}
          image={step.meta.image}
          className='h-12 w-12 flex-none rounded-full bg-gray-50'
        />
        <div className='min-w-0 flex-auto'>
          <p className='text-sm font-semibold leading-6 text-gray-900'>
            <a href={`/build/${build}/${step.meta.slug}`}>
              <span className='absolute inset-x-0 -top-px bottom-0' />
              {step.meta.title}
            </a>
          </p>
          <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
            <a
              href={`/build/${build}/${step.meta.slug}`}
              className='relative truncate hover:underline'
            >
              {step.meta.description}
            </a>
          </p>
        </div>
      </div>
      <div className='flex shrink-0 items-center gap-x-4'>
        <div className='hidden sm:flex sm:flex-col sm:items-end'>
          <p className='text-sm leading-6 text-gray-900'>{tags}</p>
          <p className='mt-1 text-xs leading-5 text-gray-500'>Last seen </p>
        </div>
        <ChevronRightIcon
          className='h-5 w-5 flex-none text-gray-400'
          aria-hidden='true'
        />
      </div>
    </li>
  )
}
