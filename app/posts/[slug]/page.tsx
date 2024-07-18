import { notFound } from 'next/navigation'
import React from 'react'
import 'highlight.js/styles/github-dark.css'

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
    title: post.meta.title ?? 'Post Not Found',
  }
}

export default async function PostPage({
  params: { slug },
}: Props): Promise<React.JSX.Element> {
  const post = await getPostByName(`${slug}.mdx`)
  if (post == null) notFound()
  const { meta, content } = post
  // const links: BreadCrumb[] = [
  //   { href: '/', label: 'Home' },
  //   { href: '/posts', label: 'Posts' },
  //   { label: meta.title ?? 'Post' },
  // ]

  return (
    <>
      <div>{content}</div>
      <div>{meta.title}</div>
    </>
    // <MdxPage
    //   meta={meta}
    //   content={content}
    //   links={links}
    // />
  )
}
