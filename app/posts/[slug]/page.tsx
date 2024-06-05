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
    title: post.meta.title,
  }
}

export default async function PostPage({
  params: { slug },
}: Props): Promise<React.JSX.Element> {
  const post = await getPostByName(`${slug}.mdx`)
  if (post == null) notFound()
  const { meta, content } = post

  return (
    <div className="container mx-auto sm:px-8 lg:px-10">
      <article className="prose">
        <h1>{meta.title}</h1>
        <h3 className="font-semibold leading-6 text-white">
          {meta.description}
        </h3>
      </article>
      <div className="m:p-10 prose relative top-0 mx-auto max-w-full p-5">
        {content}
      </div>
    </div>
  )
}
