import Link from 'next/link'
import React from 'react'

import { CloudImage } from './cloud-image'

export default function BuildsSection({
  builds,
}: {
  builds: Build[]
}): JSX.Element {
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
