import Link from 'next/link'
import React from 'react'

import { EntryArtwork } from '@/components/entry-artwork'

export default function BuildsSection({
  builds,
}: {
  builds: Build[]
}): JSX.Element {
  return (
    <div className="[grid-area:builds]">
      <h2>
        <Link href="/builds">Builds</Link>
      </h2>
      <div className="mt-12">
        {builds.map(build => (
          <article key={build.meta.slug}>
            <Link
              href={`/builds/${build.meta.slug}`}
              key={build.meta.slug}
            >
              <EntryArtwork
                key={build.meta.slug}
                meta={build.meta}
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
