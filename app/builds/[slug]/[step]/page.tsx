import { notFound } from 'next/navigation'
import React from 'react'

import MdxPage from '@/components/mdx-page'
import { getBuildsMeta } from '@/lib/github/builds'
import { getStepsMeta, getStepByName } from '@/lib/github/steps'

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
  const theStep = await getStepByName(slug, `${step}.mdx`)

  if (theStep == null) notFound()

  const { meta, content } = theStep

  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { href: '/builds', label: 'Builds' },
    { href: `/builds/${slug}`, label: slug },
    { label: meta.title },
  ]

  return (
    <MdxPage
      meta={meta}
      content={content}
      links={links}
    />
  )
}
