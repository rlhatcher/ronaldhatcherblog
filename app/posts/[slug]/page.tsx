import { notFound } from 'next/navigation'
import React from 'react'
import 'highlight.js/styles/github-dark.css'

import { CloudImage } from '@/components/cloud-image'
import TopNav from '@/components/top-nav'
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
      <TopNav
        links={[{ href: '/posts', label: 'Posts' }]}
        page={{ title: meta.title }}
      />
      <article className="relative isolate flex flex-col justify-end overflow-hidden border shadow-sm">
        <CloudImage
          title={meta.title}
          src={meta.image}
          alt={meta.description}
          width={meta.imageWidth}
          height={meta.imageHeight}
          className="mx-auto w-full"
        />
        <div className="absolute bottom-5 left-0 right-0 w-full bg-gradient-to-r from-gray-900 to-transparent">
          <h3 className="font-semibold leading-6 text-white">
            {post.meta.description}
          </h3>
        </div>
      </article>
      <div className="prose mx-auto max-w-full relative top-0  p-5 m:p-10">
        {content}
      </div>
    </div>
  )
}
