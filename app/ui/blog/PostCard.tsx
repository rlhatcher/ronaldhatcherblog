'use client'

import React from 'react'
import DateComponent from '../date'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CloudImage from '../CloudImage'

export default function PostCard ({
  post
}: {
  post: BlogPost
}): React.JSX.Element {
  if (post == null) notFound()

  return (
    <article className='relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80'>
      <CloudImage
        image={post.meta.image}
        zoom={false}
        className='absolute inset-0 -z-10 h-full w-full object-cover'
        crop='fill'
      />
      <div className='absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40' />

      <div className='flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300'>
        <DateComponent dateString={post.meta.date} />
      </div>
      <h3 className='mt-3 text-lg font-semibold leading-6 text-white'>
        <Link
          href={`/posts/${post.meta.slug}`}
          className='hover:underline'
        >
          <span className='absolute inset-0' />
          {post.meta.title}
        </Link>
      </h3>
    </article>
  )
}
