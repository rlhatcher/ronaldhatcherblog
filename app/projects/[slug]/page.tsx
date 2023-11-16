import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import 'highlight.js/styles/github-dark.css'
import TopNav from '@/app/_components/top-nav'
import Gallery from '@/app/_components/Gallery'

import { getProjectByName, getProjectsMeta } from '@/lib/projects'

export const revalidate = 10

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams (): Promise<Array<{ slug: string }>> {
  const allProjects = await getProjectsMeta()

  if (allProjects == null) return []

  return allProjects.map((project) => ({
    slug: project.meta.slug
  }))
}

export async function generateMetadata ({
  params: { slug }
}: Props): Promise<{ title: string }> {
  const project = await getProjectByName(`${slug}.mdx`)

  if (project == null) {
    return {
      title: 'Project Not Found'
    }
  }

  return {
    title: project.meta.title
  }
}

export default async function ProjectPage ({
  params: { slug }
}: Props): Promise<React.JSX.Element> {
  const project = await getProjectByName(`${slug}.mdx`)

  if (project == null) notFound()

  const { meta, content } = project
  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ))

  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav
        links={[
          { href: '/', label: 'Ω' },
          { href: '/projects', label: 'Projects' }
        ]}
        page={{ title: meta.title }}
      />
      <article>
        <div className='bg-gray-100 rounded-2xl py-4 sm:pt-4'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-3xl lg:mx-0 '>
              <div className='max-w-2xl mx-auto'>{tags}</div>
              <div className='max-w-2xl mx-auto'>
                <div className='px-2 md:px-4 prose prose-slate mx-auto'>
                  {content}
                </div>
              </div>
              <Gallery tags={[meta.slug, 'project']} />
            </div>
          </div>
        </div>
      </article>
      <hr className='border-accent-2 mt-28 mb-24' />
    </div>
  )
}
