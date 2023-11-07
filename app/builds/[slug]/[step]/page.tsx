import React from 'react'
import { getBuildsMeta } from '@/lib/builds'
import { getStepsMeta, getStepByName } from '@/lib/steps'
import TopNav from '@/app/_components/top-nav'
import { notFound } from 'next/navigation'

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
    <div className='container mx-auto px-5'>
      <TopNav
        links={[
          { href: '/', label: 'Ω' },
          { href: '/builds', label: 'Builds' },
          { href: `/builds/${slug}`, label: slug }
        ]}
        page={{ title: theStep.meta.title }}
      />
      <article>
        <div className='bg-gray-100 rounded-2xl py-4 sm:pt-4'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-3xl lg:mx-0 '>
              {/* <div className='max-w-2xl mx-auto'>{tags}</div> */}
              <div className='max-w-2xl mx-auto'>
                <div className='px-2 md:px-4 prose prose-slate mx-auto'>
                  {theStep.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <hr className='border-accent-2 mt-28 mb-24' />
      {/* <MoreStories morePosts={morePosts} /> */}
    </div>
  )
}
