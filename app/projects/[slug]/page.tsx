import { notFound } from 'next/navigation'
import React from 'react'
import 'highlight.js/styles/github-dark.css'

// import { BreadcrumbResponsive } from '@/components/bread-crumb'
import MdxPage from '@/components/mdx-page'
import { getProjectByName } from '@/lib/github/projects'

export const revalidate = 10

interface Props {
  params: {
    slug: string
  }
}

// export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
//   const projects = await getProjectsMeta()

//   if (projects == null) return []

//   return projects.map(project => ({
//     slug: project.meta.slug,
//   }))
// }

// export async function generateMetadata({
//   params: { slug },
// }: Props): Promise<{ title: string }> {
//   const project = await getProjectByName(slug)

//   if (project == null) {
//     return {
//       title: 'Project Not Found',
//     }
//   }

//   return {
//     title: project.meta.title,
//   }
// }

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
    // <div>{project.meta.slug}</div>
    <MdxPage
      meta={meta}
      content={content}
      links={links}
    />
  )
}
