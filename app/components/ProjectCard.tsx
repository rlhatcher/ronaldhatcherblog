'use client'

import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CloudImage from './CloudImage'

export default function ProjectCard ({
  project
}: {
  project: Project
}): React.JSX.Element {
  if (project == null) notFound()

  return (
    <article className='relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80'>
      <CloudImage
        image={project.meta.image}
        zoom={false}
        className='absolute inset-0 -z-10 h-full w-full object-cover'
      />
      <div className='absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40' />

      <h3 className='mt-3 text-lg font-semibold leading-6 text-white'>
        <Link
          href={`/projects/${project.meta.slug}`}
          className='hover:underline'
        >
          <span className='absolute inset-0' />
          {project.meta.title}
        </Link>
      </h3>
    </article>
  )
}