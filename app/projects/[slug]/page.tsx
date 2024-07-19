import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import React from 'react'
import 'highlight.js/styles/github-dark.css'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCitation from 'rehype-citation'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'

import SimTabs from '@/components/blog/simulations'
import { BreadcrumbResponsive } from '@/components/bread-crumb'
import { BlogGallery, BlogImage, VideoPlayer } from '@/components/cloud-image'
import {
  getProject,
  getProjectRefs,
  getProjectSlugs,
} from '@/lib/github/projects'

export const revalidate = 10

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams(): Promise<Props[]> {
  const slugs = await getProjectSlugs()

  return slugs.map(slug => ({
    params: {
      slug,
    },
  }))
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<{ title: string }> {
  const project = await getProject(slug)

  if (project == null) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.meta.title ?? 'Project Not Found',
  }
}

export default async function ProjectPage({
  params: { slug },
}: Props): Promise<React.JSX.Element> {
  const project = await getProject(slug)
  const bib = await getProjectRefs(slug)

  if (project == null) notFound()

  const { content } = await compileMDX<ProjectMeta>({
    source: project.content,
    components: {
      VideoPlayer,
      BlogImage,
      BlogGallery,
      SimTabs,
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
          [rehypeCitation, { bibliography: bib, linkCitations: true }],
        ],
      },
    },
  })
  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { label: project.meta.title ?? 'Project' },
  ]
  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <article>
        <h3 className="bg-muted p-2 font-mono text-lg font-light leading-6 shadow-lg">
          {project.meta.description}
        </h3>
        <div className="m:p-10 prose relative top-0 mx-auto p-5 dark:prose-invert prose-h1:mb-0 prose-h1:font-mono prose-ul:m-0 prose-li:m-0">
          {content}
        </div>
      </article>
    </div>
  )
}
