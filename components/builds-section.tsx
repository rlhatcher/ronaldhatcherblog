import Link from 'next/link'
import React from 'react'

import { CloudImage } from './cloud-image'

export default function BuildsSection({
  builds,
}: {
  builds: Build[]
}): JSX.Element {
  return (
    <div className="[grid-area:builds]">
      <Link href="/builds">
        <h2 className="mb-4 font-mono text-2xl font-semibold">Builds</h2>
      </Link>
      <div>
        {builds.map(build => (
          <div key={build.meta.slug}>
            <article>
              <Link
                href={`/builds/${build.meta.slug}`}
                key={build.meta.slug}
              >
                <p>{build.meta.title}</p>
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
      </div>
    </div>
  )
}
