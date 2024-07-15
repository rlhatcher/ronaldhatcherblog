import { notFound } from 'next/navigation'
import React from 'react'

import { BreadcrumbResponsive } from '@/components/bread-crumb'
import StepCarousel from '@/components/step-carousel'
import { getBuildsMeta } from '@/lib/github/builds'
import { getStepsMeta } from '@/lib/github/steps'

interface Props {
  params: {
    slug: string
    step: string
  }
}

export async function generateStaticParams(): Promise<
  Array<{ slug: string; step: string }>
> {
  const allBuilds = await getBuildsMeta()

  if (allBuilds == null) return []

  const res: Array<{ slug: string; step: string }> = []

  for (const build of allBuilds) {
    const steps = await getStepsMeta(build.meta.slug)

    if (steps == null) continue

    for (const step of steps) {
      res.push({
        slug: build.meta.slug,
        step: step.meta.slug,
      })
    }
  }
  return res
}

export default async function StepPage({
  params: { slug, step },
}: Props): Promise<React.JSX.Element> {
  const steps = await getStepsMeta(slug)
  const theStep = steps.find(s => s.meta.slug === step)
  const theIndex = steps.findIndex(s => s.meta.slug === step)

  if (theStep == null) notFound()

  const { meta, content } = theStep

  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { href: '/builds', label: 'Builds' },
    { href: `/builds/${slug}`, label: slug },
    { label: meta.title },
  ]

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <div className="flex h-36 flex-col items-center justify-center overflow-hidden">
        <h2 className="m-0 p-1 text-center text-3xl font-semibold">
          {meta.title}
        </h2>
        <p className="m-0 overflow-hidden overflow-ellipsis p-2 text-center">
          {meta.description}
        </p>
      </div>
      <StepCarousel
        build={slug}
        selected={theIndex}
        steps={steps}
      />
      <div className="m:p-10 prose relative top-0 mx-auto p-5 dark:prose-invert prose-h1:mb-0 prose-h1:font-mono prose-ul:m-0 prose-li:m-0">
        {content}
      </div>
    </div>
  )
}
