import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import 'highlight.js/styles/github-dark.css'
import TopNav from '@/app/_components/top-nav'

import { getBuildByName, getBuildsMeta } from '@/lib/builds'

export const revalidate = 10

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams (): Promise<Array<{ slug: string }>> {
  const allBuilds = await getBuildsMeta()

  if (allBuilds == null) return []

  return allBuilds.map((build) => ({
    slug: build.meta.slug
  }))
}

export async function generateMetadata ({ params: { slug } }: Props): Promise<{ title: string }> {
  const build = await getBuildByName(`${slug}.mdx`)

  if (build == null) {
    return {
      title: 'Project Not Found'
    }
  }

  return {
    title: build.meta.title
  }
}

export default async function BuildPage ({ params: { slug } }: Props): Promise<React.JSX.Element> {
  const build = await getBuildByName(`${slug}.mdx`)

  if (build == null) notFound()

  const { meta, content } = build
  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ))

  return (
    <div className='container mx-auto px-5'>
      <TopNav
        links={[
          { href: '/', label: 'Ω' },
          { href: '/builds', label: 'Builds' }
        ]}
        page={{ title: meta.title }}
      />
      <article>
        <div className='bg-gray-100 rounded-2xl py-4 sm:pt-4'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-3xl lg:mx-0 '>
              <div className='max-w-2xl mx-auto'>
                {tags}
              </div>
              <div className='max-w-2xl mx-auto'>
                <div className='px-2 md:px-4 prose prose-xl prose-slate mx-auto'>
                  {content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <hr className='border-accent-2 mt-28 mb-24' />
    </div>
  )
}
