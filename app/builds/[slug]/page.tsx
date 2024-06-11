import { notFound } from 'next/navigation'
import React from 'react'

import 'highlight.js/styles/github-dark.css'
import { BreadcrumbResponsive } from '@/components/bread-crumb'
import StepCards from '@/components/step-cards'
import { getBuildByName, getBuildsMeta } from '@/lib/github/builds'
import { getStepsMeta } from '@/lib/github/steps'

export const revalidate = 10

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const allBuilds = await getBuildsMeta()

  if (allBuilds == null) return []

  return allBuilds.map(build => ({
    slug: build.meta.slug,
  }))
}

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

  const { meta, content } = build
  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { href: '/builds', label: 'Builds' },
    { label: meta.title },
  ]

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <article className="prose">
        <h3 className="font-mono">{meta.description}</h3>
      </article>
      <StepCards steps={steps} />
      <div className="m:p-10 prose relative top-0 mx-auto p-5 prose-ul:m-0 prose-li:m-0">
        {content}
      </div>
    </div>
  )
}
