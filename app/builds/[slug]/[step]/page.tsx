import { notFound } from 'next/navigation'
import React from 'react'

import TopNav from '@/app/ui/TopNav'
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

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <TopNav
        links={[
          { href: '/builds', label: 'Builds' },
          { href: `/builds/${slug}`, label: slug },
        ]}
        page={{ title: theStep.meta.title }}
      />
      <article className="relative isolate flex flex-col justify-end overflow-hidden bg-gray-900 border shadow-sm">
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
          <h3 className="text-lg font-semibold px-2 leading-6 text-white">
            {meta.description}
          </h3>
        </div>
      </article>
      <div className="prose prose-slate mx-auto max-w-full bg-slate-50 relative top-0  p-5 m:p-10">
        {content}
      </div>
    </div>
  )
}
