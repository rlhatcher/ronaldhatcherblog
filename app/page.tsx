import React from 'react'

import BuildsSection from '@/components/builds-section'
import PostsSection from '@/components/posts-section'
import ProjectsSection from '@/components/projects-section'
import { getBuildsMeta } from '@/lib/github/builds'
import { getPostsMeta } from '@/lib/github/posts'
import { getProjectsMeta } from '@/lib/github/projects'

export const revalidate = 10

export default async function Page(): Promise<JSX.Element> {
  const posts = await getPostsMeta()
  const builds = await getBuildsMeta()
  const projects = await getProjectsMeta()

  return (
    <main className="grid max-w-full grid-cols-1fr grid-rows-auto gap-x-16 gap-y-16 pt-16 [grid-template-areas:'posts''projects''builds'] md:grid-cols-2fr-1fr md:grid-rows-auto-1fr md:[grid-template-areas:'projects_posts''projects_builds']">
      <PostsSection posts={posts} />
      <BuildsSection builds={builds} />
      <ProjectsSection projects={projects} />
    </main>
  )
}
