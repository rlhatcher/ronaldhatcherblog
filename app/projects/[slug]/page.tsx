import React from 'react'
import { notFound } from 'next/navigation'
import 'highlight.js/styles/github-dark.css'
import TopNav from '@/app/ui/TopNav'

import { getProjectByName, getProjectsMeta } from '@/app/lib/github/projects'
import CloudImage from '@/app/ui/CloudImage'

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
  const project = await getProjectByName(slug)

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
  const project = await getProjectByName(slug)

  if (project == null) notFound()

  const { meta, content } = project

  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav
        links={[{ href: '/projects', label: 'Projects' }]}
        page={{ title: meta.title }}
      />
      <article className='relative isolate flex flex-col justify-end overflow-hidden bg-gray-900 border shadow-sm'>
        <CloudImage
          title={meta.title}
          image={meta.image}
          className='mx-auto w-full'
        />
        <div className='absolute bottom-5 left-0 right-0 w-full bg-gradient-to-r from-gray-900 to-transparent'>
          <h3 className='text-lg font-semibold leading-6 text-white p-2'>
            {project.meta.description}
          </h3>
        </div>
      </article>
      <div className='prose prose-slate mx-auto max-w-full bg-white relative top-0  p-5 m:p-10'>
        {content}
      </div>
    </div>
  )
}
