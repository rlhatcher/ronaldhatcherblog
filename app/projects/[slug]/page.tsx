import { notFound } from 'next/navigation'
import React from 'react'
import 'highlight.js/styles/github-dark.css'

import { CloudImage } from '@/components/cloud-image'
import TopNav from '@/components/top-nav'
import { getProjectByName, getProjectsMeta } from '@/lib/github/projects'

export const revalidate = 10

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const projects = await getProjectsMeta()

  if (projects == null) return []

  return projects.map(project => ({
    slug: project.meta.slug,
  }))
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<{ title: string }> {
  const project = await getProjectByName(slug)

  if (project == null) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.meta.title,
  }
}

export default async function ProjectPage({
  params: { slug },
}: Props): Promise<React.JSX.Element> {
  const project = await getProjectByName(slug)

  if (project == null) notFound()

  const { meta, content } = project

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <TopNav
        links={[{ href: '/projects', label: 'Projects' }]}
        page={{ title: meta.title }}
      />
      <article className="relative isolate flex flex-col justify-end overflow-hidden border shadow-sm">
        <CloudImage
          title={meta.title}
          src={meta.image}
          crop="fill"
          className="w-full"
          alt=""
          height={meta.imageHeight}
          width={meta.imageWidth}
        />
        <div className="absolute bottom-5 left-0 right-0 w-full bg-gradient-to-r from-gray-900 to-transparent">
          <h3 className="text-lg font-semibold leading-6 text-white p-2">
            {project.meta.description}
          </h3>
        </div>
      </article>
      <div className="prose mx-auto max-w-full relative top-0  p-5 m:p-10">
        {content}
      </div>
    </div>
  )
}
