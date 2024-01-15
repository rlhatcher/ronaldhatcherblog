import React from 'react'
import { notFound } from 'next/navigation'
import 'highlight.js/styles/github-dark.css'
import TopNav from '@/app/ui/TopNav'
import StepCards from '@/app/ui/blog/StepCards'
import { getBuildByName, getBuildsMeta } from '@/app/lib/github/builds'
import CloudImage from '@/app/ui/images/CloudImage'
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

  const links = [{ href: '/builds', label: 'Builds' }]
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: meta.title }} />
      <article className='relative isolate flex flex-col justify-end overflow-hidden bg-gray-900 border shadow-sm'>
        <CloudImage
          title={meta.title}
          image={meta.image}
          className='mx-auto w-full'
          crop='auto'
        />
        <div className='absolute bottom-5 left-0 right-0 w-full bg-gradient-to-r from-gray-900 to-transparent'>
          <h3 className='text-lg font-semibold px-2 leading-6 text-white'>
            {meta.description}
          </h3>
        </div>
      </article>
      <StepCards build={slug} />
      <div className='prose prose-slate mx-auto max-w-full relative top-0  p-5 m:p-10 bg-slate-50'>
        {content}
      </div>
    </div>
  )
}
