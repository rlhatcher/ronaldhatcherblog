import { notFound } from 'next/navigation'
import React from 'react'
import 'highlight.js/styles/github-dark.css'

import { BreadcrumbResponsive } from '@/components/bread-crumb'
import { getPostByName, getPostsMeta } from '@/lib/github/posts'

export const revalidate = 10

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = await getPostsMeta()

  if (posts == null) return []

  return posts.map(post => ({
    slug: post.meta.slug,
  }))
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<{ title: string }> {
  const post = await getPostByName(`${slug}.mdx`)

  if (post == null) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.meta.title,
  }
}

export default async function PostPage({
  params: { slug },
}: Props): Promise<React.JSX.Element> {
  const post = await getPostByName(`${slug}.mdx`)
  if (post == null) notFound()
  const { meta, content } = post
  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { href: '/posts', label: 'Posts' },
    { label: meta.title },
  ]

  return (
    <div className="container mx-auto sm:px-8 lg:px-10">
      <BreadcrumbResponsive items={links} />
      <article className="prose">
        <h1 className="font-mono">{meta.title}</h1>
        <div className="m:p-10 prose relative top-0 mx-auto p-5 prose-h1:mb-0 prose-h1:font-mono prose-ul:m-0 prose-li:m-0">
          {content}
        </div>
      </article>
    </div>
  )
}
