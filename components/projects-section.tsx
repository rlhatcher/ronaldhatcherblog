import Link from 'next/link'
import React from 'react'

import { EntryArtwork } from '@/components/entry-artwork'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export default function ProjectsSection({
  projects,
}: {
  projects: Project[]
}): JSX.Element {
  return (
    <>
      <div className="font-mono flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            <Link href="/posts">Projects</Link>
          </h2>
          <p className="text-sm text-muted-foreground">Ongoing projects</p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {projects.map(project => (
              <Link
                href={`/projects/${project.meta.slug}`}
                key={project.meta.slug}
              >
                <EntryArtwork
                  key={project.meta.slug}
                  meta={project.meta}
                  className="w-[250px]"
                  aspectRatio="portrait"
                  width={500}
                  height={660}
                />
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  )
}
