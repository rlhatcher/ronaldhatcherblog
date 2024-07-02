import { notFound } from 'next/navigation'
import React from 'react'

import { BreadcrumbResponsive } from '@/components/bread-crumb'
import { CloudImage } from '@/components/cloud-image'
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
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <article className="prose relative isolate flex flex-col justify-end overflow-hidden border dark:prose-invert prose-h1:mb-0 prose-h1:font-mono prose-ul:m-0 prose-li:m-0">
        <CloudImage
          title="build"
          src={meta.image}
          className="mx-auto w-full"
          crop="thumb"
          alt=""
          width={meta.imageWidth}
          height={meta.imageHeight}
        />
        <div className="absolute bottom-5 left-0 right-0 w-full bg-gradient-to-r from-gray-900 to-transparent">
          <h3 className="px-2 text-lg font-semibold leading-6 text-white">
            {meta.description}
          </h3>
        </div>
      </article>
      <div className="m:p-10 prose prose-slate relative top-0 mx-auto max-w-full bg-slate-50 p-5">
        {content}
      </div>
    </div>
  )
}
