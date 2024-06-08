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
            className="flex flex-col items-center p-4"
          >
            <Link
              href={`/projects/${project.meta.slug}`}
              key={project.meta.slug}
              className="flex w-full max-w-[500px] flex-col items-center"
            >
              <EntryArtwork
                key={project.meta.slug}
                meta={project.meta}
                className="h-full"
                aspectRatio="square"
                width={500}
                height={500}
              />
              <div className="w-full max-w-xs">
                <h3 className="mt-3 text-center font-medium leading-none">
                  {project.meta.title}
                </h3>
                <p className="mt-1 text-center text-xs text-muted-foreground">
                  {project.meta.description}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
