import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import 'highlight.js/styles/github-dark.css'
import TopNav from '@/app/_components/top-nav'
import StepCards from '@/app/_components/StepCards'
import { getBuildByName, getBuildsMeta } from '@/lib/builds'
import CoverImage from '@/app/_components/cover-image'
import Tag from '@/app/_components/Tag'
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

  const links = [
    { href: '/', label: 'Ω' },
    { href: '/builds', label: 'Builds' }
  ]
  return (
    <div className='container mx-auto px-5'>
      <TopNav links={links} page={{ title: meta.title }} />
      <div className='bg-gray-100 rounded-2xl p-4'>
        <CoverImage
          title={meta.title}
          image={meta.image}
          className='rounded-2xl'
        />
        <div className='mt-6'>
          <dl className='grid grid-cols-1 sm:grid-cols-2'>
            <div className='border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0'>
              <dt className='text-lg font-medium leading-6 text-gray-900'>
                Project
              </dt>
              <Link href={`/projects/${meta.project}`}>
                <dd className='mt-1 text-sm leading-6 text-gray-700 sm:mt-2 hover:underline'>
                  {meta.project}
                </dd>
              </Link>
            </div>
            <div className='border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0'>
              <dt className='text-lg font-medium leading-6 text-gray-900'>
                Tags
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:mt-2'>
                {tags}
              </dd>
            </div>
            <div className='border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0'>
              <dt className='text-lg font-medium leading-6 text-gray-900'>
                Steps
              </dt>
              <StepCards build={slug} />
            </div>
            <div className='border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0'>
              <dt className='text-lg font-medium leading-6 text-gray-900'>
                Overview
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:mt-2 prose'>
                {content}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
