import { notFound } from 'next/navigation'
import React from 'react'

import 'highlight.js/styles/github-dark.css'
import { BreadcrumbResponsive } from '@/components/bread-crumb'
import StepCarousel from '@/components/step-carousel'
import { getBuildByName } from '@/lib/github/builds'
import { getStepsMeta } from '@/lib/github/steps'

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

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <StepCarousel
        build={build.meta.slug}
        selected="build"
        steps={steps}
      />
    </div>
  )
}
