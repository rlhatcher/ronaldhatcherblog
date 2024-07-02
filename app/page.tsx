import Link from 'next/link'
import React from 'react'

import BuildsSection from '@/components/builds'
import { PostsList } from '@/components/posts'
import ProjectsSection from '@/components/projects'
import { getBuildsMeta } from '@/lib/github/builds'
import { getPostsMeta } from '@/lib/github/posts'
import { getProjectsMeta } from '@/lib/github/projects'

export const revalidate = 10

export default async function Page(): Promise<JSX.Element> {
  const posts = await getPostsMeta()
  const builds = await getBuildsMeta()
  const projects = await getProjectsMeta()

  return (
    <main className="grid max-w-full grid-cols-1fr grid-rows-auto gap-x-16 gap-y-16 pt-6 [grid-template-areas:'posts''projects''builds'] md:grid-cols-2fr-1fr md:grid-rows-auto-1fr md:[grid-template-areas:'projects_posts''projects_builds']">
      <PostsList posts={posts} />
      <div className="[grid-area:builds]">
        <Link href="/builds">
          <h2 className="mb-4 font-mono text-2xl font-semibold">Builds</h2>
        </Link>
        <div>
          <BuildsSection builds={builds} />
        </div>
      </div>
      <div className="[grid-area:projects]">
        <h2 className="mb-4 font-mono text-2xl font-semibold">
          <Link href="/projects">Projects</Link>
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectsSection projects={projects} />
        </div>
      </div>
    </main>
  )
}
