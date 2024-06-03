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
      <h2 className="text-2xl font-semibold font-mono mb-4">
        <Link href="/projects">Projects</Link>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
        {projects.map(project => (
          <article key={project.meta.slug}>
            <Link
              href={`/projects/${project.meta.slug}`}
              key={project.meta.slug}
            >
              <EntryArtwork
                key={project.meta.slug}
                meta={project.meta}
                className="w-[250px]"
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
