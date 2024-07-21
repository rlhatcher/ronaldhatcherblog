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

export function BuildsSection({ builds }: { builds: Build[] }): JSX.Element {
  return (
    <>
      {builds.map(build => (
        <div key={build.meta.slug}>
          <article className="mb-2 border-b pb-2">
            <Link
              href={`/builds/${build.meta.slug}`}
              key={build.meta.slug}
            >
              <h2 className="min-h-16 text-lg font-semibold">
                {build.meta.title}
              </h2>
              <div className="overflow-hidden rounded-md">
                <CloudImage
                  src={build.meta.image ?? 'logo'}
                  alt={build.meta.title ?? 'Build'}
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

export function BuildTiles({ builds }: { builds: Build[] }): JSX.Element {
  return (
    <>
      {builds.map(build => (
        <Card key={build.meta.slug}>
          <CardHeader>
            <CardTitle className="max-h-12 overflow-hidden font-mono">
              {build.meta.title}
            </CardTitle>
            <CardDescription className="max-h-16 min-h-16 overflow-hidden">
              {build.meta.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={`/builds/${build.meta.slug}`}
              key={build.meta.slug}
              className="flex w-full max-w-[500px] flex-col items-center"
            >
              <EntryArtwork
                key={build.meta.slug}
                meta={build.meta}
                className="h-full"
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
