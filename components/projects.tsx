import Link from 'next/link'
import React from 'react'

import { CloudImage } from './cloud-image'
import { EntryArtwork } from './entry-artwork'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export function ProjectList({
  projects,
}: {
  projects: Project[]
}): JSX.Element {
  return (
    <div>
      {projects.map(project => (
        <article
          key={project.meta.slug}
          className="mb-2 flex flex-col items-start justify-between border-b pb-2"
        >
          {/* <div className="mb-1 flex items-center gap-x-4 text-xs">
              <time dateTime={project.meta.date}>{project.meta.date}</time>
              {project.meta.project !== undefined && (
                <Link
                  href={`/projects/${update.meta.project}`}
                  className={badgeVariants({ variant: 'secondary' })}
                >
                  Project
                </Link>
              )}
              {update.meta.build !== undefined && (
                <Link
                  href={`/builds/${update.meta.build}`}
                  className={badgeVariants({ variant: 'secondary' })}
                >
                  Build
                </Link>
              )}
              {update.meta.repo !== undefined && (
                <Link
                  href={update.meta.repo}
                  className={badgeVariants({ variant: 'secondary' })}
                >
                  <SiGithub size={13} />
                  <span className="ml-1">Files</span>
                </Link>
              )}
            </div> */}
          <p className="text-md font-semibold">{project.meta.title}</p>
          <Link
            href={`/projects/${project.meta.slug}`}
            key={project.meta.slug}
          >
            <div className="relative mt-2 flex items-center gap-x-4">
              <CloudImage
                src={project.meta.image ?? 'logo'}
                alt={project.meta.title ?? 'logo'}
                className="h-10 w-10 rounded-sm"
                width={100}
                height={100}
              />
              <div className="leading-6">
                <p className="text-xs">{project.meta.description}</p>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}

export default function ProjectsSection({
  projects,
}: {
  projects: Project[]
}): JSX.Element {
  return (
    <>
      {projects.map(project => (
        <div key={project.meta.slug}>
          <article className="mb-2 border-b pb-2">
            <Link
              href={`/projects/${project.meta.slug}`}
              key={project.meta.slug}
            >
              <h2 className="min-h-16 text-lg font-semibold">
                {project.meta.title}
              </h2>
              <div className="overflow-hidden rounded-md">
                <CloudImage
                  src={project.meta.image ?? 'logo'}
                  alt={project.meta.title ?? 'Build'}
                  crop="fill"
                  width={640}
                  height={400}
                  className="h-auto w-auto object-cover transition-all hover:scale-105"
                />
              </div>
            </Link>
          </article>
        </div>
      ))}
    </>
  )
}

export function ProjectTiles({
  projects,
}: {
  projects: Project[]
}): JSX.Element {
  return (
    <>
      {projects.map(project => (
        <Card key={project.meta.slug}>
          <CardHeader>
            <CardTitle className="max-h-12 overflow-hidden font-mono">
              {project.meta.title}
            </CardTitle>
            <CardDescription className="max-h-16 min-h-16 overflow-hidden">
              {project.meta.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-4">
            <Link
              href={`/projects/${project.meta.slug}`}
              key={project.meta.slug}
              className="flex w-full max-w-[500px] flex-col items-center"
            >
              <EntryArtwork
                key={project.meta.slug}
                meta={project.meta}
                className="h-full hover:scale-105"
                aspectRatio="square"
                width={500}
                height={500}
              />
            </Link>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
