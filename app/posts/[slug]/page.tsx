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
import Video from '@/components/Video'
import { getPost, getPosts } from '@/lib/github/posts'

export const revalidate = 10

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = await getPosts()

  if (posts == null) return []

  return posts.map(post => ({
    slug: post.meta.slug,
  }))
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<{ title: string }> {
  const post = await getPost(slug)

  if (post == null) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.meta.title ?? 'Post Not Found',
  }
}

export default async function PostPage({
  params: { slug },
}: Props): Promise<React.JSX.Element> {
  const post = await getPost(slug)
  if (post == null) notFound()

  const { content } = await compileMDX<ProjectMeta>({
    source: post.content,
    components: {
      VideoPlayer,
      BlogImage,
      BlogGallery,
      SimTabs,
      Video,
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
    { href: '/posts', label: 'Updates' },
    { label: post.meta.title ?? 'Update' },
  ]

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <article>
        <h3 className="bg-muted p-2 font-mono text-lg font-light leading-6 shadow-lg">
          {post.meta.description}
        </h3>
        <div className="m:p-10 prose relative top-0 mx-auto p-5 dark:prose-invert prose-h1:mb-0 prose-h1:font-mono prose-ul:m-0 prose-li:m-0">
          {content}
        </div>
      </article>
    </div>
  )
}
