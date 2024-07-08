import { notFound } from 'next/navigation'
import React from 'react'

import 'highlight.js/styles/github-dark.css'
import { BreadcrumbResponsive } from '@/components/bread-crumb'
import BuildViewer from '@/components/build-viewer'
import DesignView from '@/components/design'
import { getBuildByName } from '@/lib/github/builds'
import { getStepsMeta } from '@/lib/github/steps'
import { fetchDesign } from '@/lib/neo4j'

export const revalidate = 10

interface Props {
  params: {
    slug: string
  }
}

// export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
//   const allBuilds = await getBuildsMeta()

//   if (allBuilds == null) return []

//   return allBuilds.map(build => ({
//     slug: build.meta.slug,
//   }))
// }

export async function generateMetadata({
  params: { slug },
}: Props): Promise<{ title: string }> {
  const build = await getBuildByName(`${slug}.mdx`)

  if (build == null) {
    return {
      title: 'Build Not Found',
    }
  }

  return {
    title: build.meta.title,
  }
}

export default async function BuildPage({
  params: { slug },
}: Props): Promise<React.JSX.Element> {
  const build = await getBuildByName(`${slug}.mdx`)
  const steps: Step[] = await getStepsMeta(slug)

  if (build == null) notFound()

  const { meta } = build
  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { href: '/builds', label: 'Builds' },
    { label: meta.title },
  ]
  const designId = meta.designId ?? ''
  const design = await fetchDesign(designId)

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      {design != null && <DesignView design={design} />}
      <BuildViewer
        build={build}
        steps={steps}
      />
    </div>
  )
}
