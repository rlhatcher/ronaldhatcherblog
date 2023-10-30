import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import 'highlight.js/styles/github-dark.css'
import TopNav from '@/app/_components/top-nav'
import StepCards from '@/app/_components/StepCards'
import { getBuildByName, getBuildsMeta } from '@/lib/builds'
import CoverImage from '@/app/_components/cover-image'
import Tag from '@/app/_components/Tag'
import Gallery from '@/app/_components/Gallery'
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

export async function generateMetadata ({
  params: { slug }
}: Props): Promise<{ title: string }> {
  const build = await getBuildByName(`${slug}.mdx`)

  if (build == null) {
    return {
      title: 'Build Not Found'
    }
  }

  return {
    title: build.meta.title
  }
}

export default async function BuildPage ({
  params: { slug }
}: Props): Promise<React.JSX.Element> {
  const build = await getBuildByName(`${slug}.mdx`)

  if (build == null) notFound()

  const { meta, content } = build
  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      <Tag label={tag} />
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

      <div className='relative isolate overflow-hidden bg-white px-6 py-2 sm:py-2 lg:overflow-visible lg:px-0'>
        <div className='bg-gray-100 rounded-2xl py-4 sm:pt-4'>
          <div className='mx-auto grid max-w-2xl gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10'>
            <div className='font-mono lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:gap-x-8 lg:px-8'>
              <div className='lg:pr-4'>
                <div className='lg:max-w-lg'>
                  <div className='mt-4 grid  grid-cols-2 items-center gap-x-5 border border-gray-300 p-4 rounded-xl'>
                  <div className='text-base font-semibold leading-7 col-span-2 pb-2'>
                    {meta.description}
                  </div>
                    <div>Project</div>
                    <div className='font-bold'>
                      <Link href={`/projects/${meta.project}`}>
                        {meta.project}
                      </Link>
                    </div>
                    <div>Tags</div>
                    <div>
                      {tags}
                    </div>
                    <div>launches</div>
                    <div>launches</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden'>
              <CoverImage
                title={meta.title}
                image={meta.image}
                slug={slug}
                className='rounded-2xl'
              />
              <h1 className='py-2 text-3xl text-center tracking-tight text-gray-900 sm:text-4xl'>
                Steps
              </h1>
              <StepCards build={slug} />
            </div>
            <div className='lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
              <div className='max-w-xl prose text-base leading-7 text-gray-700 lg:max-w-lg'>
                {content}
              </div>
            </div>
            <Gallery tags={[meta.slug, 'build']} />
          </div>
        </div>
        <hr className='border-accent-2 mt-28 mb-24' />
      </div>
    </div>
  )
}
