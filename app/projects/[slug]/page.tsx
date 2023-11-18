import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import 'highlight.js/styles/github-dark.css'
import TopNav from '@/app/_components/TopNav'

import { getProjectByName, getProjectsMeta } from '@/lib/projects'
import Tag from '@/app/_components/Tag'
import CloudImage from '@/app/_components/CloudImage'

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
    <Link key={i} href={`/tags/${tag}`} className='p-1'>
      <Tag label={tag} />
    </Link>
  ))

  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav
        links={[{ href: '/projects', label: 'Projects' }]}
        page={{ title: meta.title }}
      />
      <div className='bg-gray-100 rounded-2xl static'>
        <div>
          <CloudImage
            title={meta.title}
            image={meta.image}
            className='rounded-xl mx-auto w-full'
          />
        </div>
        <div className='mt-1 text-sm leading-6 text-gray-700 sm:mt-2'>
          {tags}
        </div>
        <div className='prose prose-slate mx-auto bg-white relative top-0 -mt-32 p-5 sm:p-10'>
          {content}
        </div>
      </div>
    </div>
  )
}
