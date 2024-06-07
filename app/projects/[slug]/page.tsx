import { notFound } from 'next/navigation'
import React from 'react'
import 'highlight.js/styles/github-dark.css'

// import { BreadcrumbResponsive } from '@/components/bread-crumb'
import { BreadcrumbResponsive } from '@/components/bread-crumb'
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
  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { label: meta.title },
  ]
  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <article className="prose">
        <h3 className="bg-secondary p-2 text-lg font-semibold leading-6">
          {meta.description}
        </h3>
        <div className="m:p-10 prose relative top-0 mx-auto p-5">{content}</div>
      </article>
    </div>
  )
}
