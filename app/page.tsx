import React from 'react'

import BuildsSection from '@/components/builds-section'
import Container from '@/components/container'
import PostsSection from '@/components/posts-section'
import ProjectsSection from '@/components/projects-section'
import { getBuildsMeta } from '@/lib/github/builds'
import { getPostsMeta } from '@/lib/github/posts'
import { getProjectsMeta } from '@/lib/github/projects'

export const revalidate = 10

function Intro(): JSX.Element {
  return (
    <section className="mb-4 mt-2 flex flex-col items-center font-mono md:mb-4 md:flex-row md:justify-between">
      <h1 className="flex-grow text-3xl font-bold leading-tight tracking-tighter md:pr-8 md:text-3xl">
        Ronald Hatcher.
      </h1>
      <h2 className="mt-2 text-center text-xl md:pl-8 md:text-left">
        Personal notes and projects.
      </h2>
    </section>
  )
}

export default async function Page(): Promise<JSX.Element> {
  const posts = await getPostsMeta()
  const builds = await getBuildsMeta()
  const projects = await getProjectsMeta()

  return (
    <Container>
      <Intro />
      <main className="grid max-w-full grid-cols-1fr grid-rows-auto gap-x-16 gap-y-16 pt-16 [grid-template-areas:'projects''posts''builds'] md:grid-cols-2fr-1fr md:grid-rows-auto-1fr md:[grid-template-areas:'projects_posts''projects_builds']">
        <PostsSection posts={posts} />
        <BuildsSection builds={builds} />
        <ProjectsSection projects={projects} />
      </main>
    </Container>
  )
}
