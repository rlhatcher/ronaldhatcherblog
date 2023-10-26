import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import 'highlight.js/styles/github-dark.css'
import TopNav from '@/app/_components/top-nav'
import StepCards from '@/app/_components/StepCards'
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

export async function generateMetadata ({
  params: { slug }
}: Props): Promise<{ title: string }> {
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

export default async function BuildPage ({
  params: { slug }
}: Props): Promise<React.JSX.Element> {
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

      <div className='relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0'>
        <div className='absolute inset-0 -z-10 overflow-hidden'>
          <svg
            className='absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]'
            aria-hidden='true'
          >
            <defs>
              <pattern
                id='e813992c-7d03-4cc4-a2bd-151760b470a0'
                width={200}
                height={200}
                x='50%'
                y={-1}
                patternUnits='userSpaceOnUse'
              >
                <path d='M100 200V.5M.5 .5H200' fill='none' />
              </pattern>
            </defs>
            <svg x='50%' y={-1} className='overflow-visible fill-gray-50'>
              <path
                d='M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z'
                strokeWidth={0}
              />
            </svg>
            <rect
              width='100%'
              height='100%'
              strokeWidth={0}
              fill='url(#e813992c-7d03-4cc4-a2bd-151760b470a0)'
            />
          </svg>
        </div>
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10'>
          <div className='lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
            <div className='lg:pr-4'>
              <div className='lg:max-w-lg'>
                <p className='text-base font-mono font-semibold leading-7'>
                  {meta.description}
                </p>
                <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                {meta.title}
                </h1>
                <p className='mt-6 text-xl leading-8 text-gray-700'>
                  {tags}
                </p>
              </div>
            </div>
          </div>
          <div className='-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden'>
            <StepCards build={slug} />
          </div>
          <div className='lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
            <div className='lg:pr-4'>
              <div className='max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg'>
                {content}
              </div>
            </div>
          </div>
        </div>

        <hr className='border-accent-2 mt-28 mb-24' />
      </div>
    </div>
  )
}
