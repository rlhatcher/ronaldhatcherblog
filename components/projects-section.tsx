import Link from 'next/link'
import React from 'react'

import { EntryArtwork } from '@/components/entry-artwork'

export default function ProjectsSection({
  projects,
}: {
  projects: Project[]
}): JSX.Element {
  return (
    <div className="[grid-area:projects]">
      <h2 className="mb-4 font-mono text-2xl font-semibold">
        <Link href="/projects">Projects</Link>
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <article
            key={project.meta.slug}
            className="flex justify-center p-4"
          >
            <Link
              href={`/projects/${project.meta.slug}`}
              key={project.meta.slug}
            >
              <EntryArtwork
                key={project.meta.slug}
                meta={project.meta}
                className="w-full h-full max-w-[500] max-h-[500]"
                aspectRatio="square"
                width={500}
                height={500}
              />
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
