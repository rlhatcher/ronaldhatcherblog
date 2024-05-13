import React from 'react'

// import FeatureSection from '../components/feature-section'
import PostsSection from '../components/posts-section'

import BuildsSection from '@/components/builds-section'
import Container from '@/components/container'
import { getBuildsMeta } from '@/lib/github/builds'
import { getPostsMeta } from '@/lib/github/posts'

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

  return (
    <Container>
      <Intro />
      <div className="col-span-3 lg:col-span-4 lg:border-l">
        <div className="h-full px-4 py-6 lg:px-8">
          <div className="h-full space-y-6">
            <PostsSection posts={posts} />
            <BuildsSection builds={builds} />
          </div>
        </div>
      </div>
    </Container>
  )
}
