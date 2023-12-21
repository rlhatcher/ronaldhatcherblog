'use client'

import React from 'react'
import Link from 'next/link'
import CloudImage from './CloudImage'

export default function ProjectList ({
  projects
}: {
  projects: Project[]
}): React.JSX.Element {
  return (
    <div className='mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8  lg:max-w-none lg:grid-cols-3'>
      {projects.map((project) => {
        return (
          <Link href={`/projects/${project.meta.slug}`} key={project.meta.slug} className='bg-gray-300 shadow-sm font-mono rounded-md p-2'>
            {project.meta.title}
          </Link>
        )
      })}
    </div>
  )
}
