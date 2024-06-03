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
    <section className="flex-col md:flex-row flex font-mono items-center md:justify-between mt-2 mb-4 md:mb-4">
      <h1 className="text-3xl md:text-3xl font-bold flex-grow tracking-tighter leading-tight md:pr-8">
        Ronald Hatcher.
      </h1>
      <h2 className="text-center md:text-left text-xl mt-2 md:pl-8">
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
      <main
        className="
        grid
        pt-16 gap-x-16 gap-y-16
        grid-rows-auto
        md:grid-rows-auto-1fr
        [grid-template-areas:'posts''projects''builds']
        md:[grid-template-areas:'posts projects''posts builds']
        grid-cols-1fr md:grid-cols-2fr-1fr"
      >
        <PostsSection posts={posts} />
        <BuildsSection builds={builds} />
        <ProjectsSection projects={projects} />
      </main>
    </Container>
  )
}

/*
.bHxaNU {
  position: relative;
  align-items: start;
}
*/
