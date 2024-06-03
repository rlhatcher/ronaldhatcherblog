import Link from 'next/link'
import React from 'react'

export default function BuildsSection({
  builds,
}: {
  builds: Build[]
}): JSX.Element {
  return (
    <div className="[grid-area:builds]">
      <Link href="/builds">
        <h2>Builds</h2>
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
              </Link>
            </article>
          </div>
        ))}
      </div>
    </div>
  )
}
