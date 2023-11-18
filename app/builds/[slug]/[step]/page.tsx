import React from 'react'
import { getBuildsMeta } from '@/lib/builds'
import { getStepsMeta, getStepByName } from '@/lib/steps'
import TopNav from '@/app/_components/TopNav'
import { notFound } from 'next/navigation'
import CloudImage from '@/app/_components/CloudImage'

interface Props {
  params: {
    slug: string
    step: string
  }
}

export async function generateStaticParams (): Promise<
Array<{ slug: string, step: string }>
> {
  const allBuilds = await getBuildsMeta()

  if (allBuilds == null) return []

  const res: Array<{ slug: string, step: string }> = []

  for (const build of allBuilds) {
    const steps = await getStepsMeta(build.meta.slug)

    if (steps == null) continue

    for (const step of steps) {
      res.push({
        slug: build.meta.slug,
        step: step.meta.slug
      })
    }
  }
  return res
}

export default async function StepPage ({
  params: { slug, step }
}: Props): Promise<React.JSX.Element> {
  const theStep = await getStepByName(slug, `${step}.mdx`)

  if (theStep == null) notFound()
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav
        links={[
          { href: '/builds', label: 'Builds' },
          { href: `/builds/${slug}`, label: slug }
        ]}
        page={{ title: theStep.meta.title }}
      />
      <div className='bg-gray-100 rounded-2xl static'>
        <div>
          <CloudImage
            title='build'
            image={theStep.meta.image}
            className='rounded-xl mx-auto w-full'
          />
        </div>

        <div className='prose prose-slate mx-auto bg-white relative top-0 -mt-32 p-5 sm:p-10'>
          {theStep.content}
        </div>
      </div>
    </div>
  )
}
