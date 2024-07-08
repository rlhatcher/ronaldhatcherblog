import Link from 'next/link'
import React from 'react'

import { CloudImage } from './cloud-image'
import { EntryArtwork } from './entry-artwork'

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
                  src={build.meta.image}
                  alt={build.meta.title}
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
        <article
          key={build.meta.slug}
          className="flex flex-col items-center p-4"
        >
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
            <div className="w-full max-w-xs">
              <h3 className="mt-3 text-center font-medium leading-none">
                {build.meta.title}
              </h3>
              <p className="mt-1 text-center text-xs text-muted-foreground">
                {build.meta.description}
              </p>
            </div>
          </Link>
        </article>
      ))}
    </>
  )
}
