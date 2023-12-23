'use client'

import React from 'react'
import Link from 'next/link'
import CloudImage from './CloudImage'
import Tag from './Tag'

export default function ProjectList ({
  projects
}: {
  projects: Project[]
}): React.JSX.Element {
  return (
    <ul role='list' className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {projects.map((project) => {
        return (
          <Link href={`/projects/${project.meta.slug}`} key={project.meta.slug}>
            <li
              key={project.meta.slug}
              className='flex justify-between bg-white gap-x-6 py-5 px-5 mb-2  border-l-8 border-slate-500 rounded-sm'
            >
              <div className='flex min-w-0 gap-x-4 my-1'>
              <div className='relative h-24 w-24 flex-none bg-gray-50'>
                <CloudImage
                  className='absolute top-0 left-0 h-full w-full object-cover rounded-md'
                  image={project.meta.image}
                  height={96}
                  width={96}
                  crop='thumb'
                  alt=''
                />
                </div>
                <div className='min-w-0 flex-auto'>
                  <p className='text-lg font-semibold leading-6 text-gray-900'>
                    {project.meta.title}
                  </p>
                  <p className='mt-1 truncate text-sm leading-5 text-gray-500'>
                    {project.meta.description}
                  </p>
                </div>
              </div>
              <div className='hidden shrink-0  sm:flex sm:flex-col sm:items-end'>
                <p className='text-sm leading-6 text-gray-900'>
                  {project.meta.tags.map((tag, i) => (
                    <div key={i}>
                      <Link href={`/tags/${tag}`}>
                        <Tag label={tag} />
                      </Link>
                    </div>
                  ))}
                </p>
              </div>
            </li>
          </Link>
        )
      })}
    </ul>
  )
}
