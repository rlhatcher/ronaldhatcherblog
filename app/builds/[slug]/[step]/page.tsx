import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import React from 'react'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCitation from 'rehype-citation'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'

import SimTabs from '@/components/blog/simulations'
import { BreadcrumbResponsive } from '@/components/bread-crumb'
import { BlogGallery, BlogImage, VideoPlayer } from '@/components/cloud-image'
import { Rocket3DViewer } from '@/components/model-viewers'
import StepCarousel from '@/components/step-carousel'
import { getBuilds } from '@/lib/github/builds'
import { getSteps } from '@/lib/github/steps'

interface Props {
  params: {
    slug: string
    step: string
  }
}

export async function generateStaticParams(): Promise<
  Array<{ slug: string; step: string }>
> {
  const allBuilds = await getBuilds()

  if (allBuilds == null) return []

  const res: Array<{ slug: string; step: string }> = []

  for (const build of allBuilds) {
    const steps = await getSteps(build.meta.slug)

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
  const steps = await getSteps(slug)
  const theStep = steps.find(s => s.meta.slug === step)
  const theIndex = steps.findIndex(s => s.meta.slug === step)

  if (theStep == null) notFound()

  const { content } = await compileMDX<ProjectMeta>({
    source: theStep.content,
    components: {
      VideoPlayer,
      BlogImage,
      BlogGallery,
      SimTabs,
      Rocket3DViewer,
    },
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          [
            remarkToc,
            {
              tight: true,
              heading: 'Contents',
            },
          ],
        ],
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'prepend' }],
          [rehypeCitation, { bibliography: [], linkCitations: true }],
        ],
      },
    },
  })

  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { href: '/builds', label: 'Builds' },
    { href: `/builds/${slug}`, label: slug },
    { label: theStep.meta.title ?? 'Step' },
  ]

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <div className="flex h-36 flex-col items-center justify-center overflow-hidden">
        <h2 className="m-0 p-1 text-center text-3xl font-semibold">
          {theStep.meta.title}
        </h2>
        <p className="m-0 overflow-hidden overflow-ellipsis p-2 text-center">
          {theStep.meta.description}
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
