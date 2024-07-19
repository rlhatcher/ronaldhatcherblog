import { SiGithub } from '@icons-pack/react-simple-icons'
import Link from 'next/link'
import React from 'react'

import { CloudImage } from './cloud-image'
import { EntryArtwork } from './entry-artwork'

import { badgeVariants } from '@/components/ui/badge'

export function UpdatesList({ updates }: { updates: Update[] }): JSX.Element {
  return (
    <div className="[grid-area:updates]">
      <h2 className="mb-4 font-mono text-2xl font-semibold">
        <Link href="/updates">Updates</Link>
      </h2>
      <div>
        {updates.map(update => (
          <article
            key={update.meta.slug}
            className="mb-2 flex flex-col items-start justify-between border-b pb-2"
          >
            <div className="mb-1 flex items-center gap-x-4 text-xs">
              <time dateTime={update.meta.date?.toDateString()}>
                {update.meta.date?.toLocaleString()}
              </time>
              {update.meta.project !== undefined && (
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
            </div>
            <p className="text-md font-semibold">{update.meta.title}</p>
            <Link
              href={`/updates/${update.meta.slug}`}
              key={update.meta.slug}
            >
              <div className="relative mt-2 flex items-center gap-x-4">
                <CloudImage
                  src={update.meta.image ?? 'logo'}
                  alt={update.meta.title ?? 'Update'}
                  className="h-10 w-10 rounded-sm"
                  width={100}
                  height={100}
                />
                <div className="leading-6">
                  <p className="text-xs">{update.meta.description}</p>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export function UpdatesSection({
  updates,
}: {
  updates: Update[]
}): JSX.Element {
  return (
    <>
      {updates.map(update => (
        <article
          key={update.meta.slug}
          className="flex flex-col items-center p-4"
        >
          <Link
            href={`/updates/${update.meta.slug}`}
            key={update.meta.slug}
            className="flex w-full max-w-[500px] flex-col items-center"
          >
            <EntryArtwork
              key={update.meta.slug}
              meta={update.meta}
              className="h-full"
              aspectRatio="square"
              width={500}
              height={500}
            />
            <div className="w-full max-w-xs">
              <h3 className="mt-3 text-center font-medium leading-none">
                {update.meta.title}
              </h3>
              <p className="mt-1 text-center text-xs text-muted-foreground">
                {update.meta.description}
              </p>
            </div>
          </Link>
        </article>
      ))}
    </>
  )
}
