import { notFound } from 'next/navigation'
import React from 'react'

import { BreadcrumbResponsive } from '@/components/bread-crumb'
import BuildViewer from '@/components/build-viewer'
import { getBuildByName, getStepsMeta, getStepBySlug } from '@/lib/api'

interface Props {
  params: {
    slug: string
    stepSlug: string
  }
}

export default async function BuildStepPage({
  params: { slug, stepSlug },
}: Props): Promise<React.JSX.Element> {
  const build = await getBuildByName(`${slug}.mdx`)
  const steps: Step[] = await getStepsMeta(slug)
  const step = await getStepBySlug(slug, stepSlug)

  if (build == null || step == null) notFound()

  const { meta } = build
  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { href: '/builds', label: 'Builds' },
    { href: `/builds/${slug}`, label: meta.title },
    { label: step.meta.title },
  ]

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <BuildViewer
        build={build}
        steps={steps}
        currentStepSlug={stepSlug}
      />
    </div>
  )
}
