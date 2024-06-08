'use client'

import Link from 'next/link'
import React from 'react'

import { CloudImage } from '@/components/cloud-image'

export default function ProjectList({
  projects,
}: {
  projects: Project[]
}): React.JSX.Element {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      {projects.map(project => {
        return (
          <Link
            href={`/projects/${project.meta.slug}`}
            key={project.meta.slug}
          >
            <li
              key={project.meta.slug}
              className="mb-2 flex justify-between gap-x-6 rounded-sm border-l-8 border-slate-400 bg-slate-200 px-5 py-5"
            >
              <div className="my-1 flex min-w-0 gap-x-4">
                <div className="relative h-24 w-24 flex-none bg-gray-50">
                  <CloudImage
                    className="absolute left-0 top-0 h-full w-full rounded-md object-cover"
                    src={project.meta.image}
                    height={96}
                    width={96}
                    crop="thumb"
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-auto">
                  <p className="text-lg font-semibold leading-6 text-gray-900">
                    {project.meta.title}
                  </p>
                  <p className="wrap mt-1 text-xs leading-5 text-gray-500">
                    {project.meta.description}
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
