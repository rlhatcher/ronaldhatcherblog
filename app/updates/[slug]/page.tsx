import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import React from 'react'
import 'highlight.js/styles/github-dark.css'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCitation from 'rehype-citation'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'

import MdxComponents from '@/components/blog/mdx-components'
import { BreadcrumbResponsive } from '@/components/bread-crumb'
import { getUpdate, getUpdates } from '@/lib/github/updates'

export const revalidate = 10

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const updates = await getUpdates()

  if (updates == null) return []

  return updates.map(update => ({
    slug: update.meta.slug,
  }))
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<{ title: string }> {
  const update = await getUpdate(slug)

  if (update == null) {
    return {
      title: 'Update Not Found',
    }
  }

  return {
    title: update.meta.title ?? 'Update Not Found',
  }
}

export default async function UpdatePage({
  params: { slug },
}: Props): Promise<React.JSX.Element> {
  const update = await getUpdate(slug)
  if (update == null) notFound()

  const options: any = {
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
  }

  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { href: '/updates', label: 'Updates' },
    { label: update.meta.title ?? 'Update' },
  ]

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <article>
        <h3 className="bg-muted p-2 font-mono text-lg font-light leading-6 shadow-lg">
          {update.meta.description}
        </h3>
        <div className="m:p-10 prose relative top-0 mx-auto p-5 dark:prose-invert prose-h1:mb-0 prose-h1:font-mono prose-ul:m-0 prose-li:m-0">
          <MDXRemote
            source={update.content}
            components={MdxComponents}
            options={options}
          />
        </div>
      </article>
    </div>
  )
}
