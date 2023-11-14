import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import 'highlight.js/styles/github-dark.css'
import TopNav from '@/app/_components/top-nav'
import CoverImage from '@/app/_components/cover-image'

import { getPostByName, getPostsMeta } from '@/lib/posts'

export const revalidate = 10

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams (): Promise<Array<{ slug: string }>> {
  const posts = await getPostsMeta()

  if (posts == null) return []

  return posts.map((post) => ({
    slug: post.meta.slug
  }))
}

export async function generateMetadata ({
  params: { slug }
}: Props): Promise<{ title: string }> {
  const post = await getPostByName(`${slug}.mdx`)

  if (post == null) {
    return {
      title: 'Post Not Found'
    }
  }

  return {
    title: post.meta.title
  }
}

export default async function PostPage ({
  params: { slug }
}: Props): Promise<React.JSX.Element> {
  const post = await getPostByName(`${slug}.mdx`)

  if (post == null) notFound()

  const { meta, content } = post
  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ))

  const links = [
    { href: '/', label: 'Ω' },
    { href: '/posts', label: 'Posts' }
  ]

  return (
    <div className='container mx-auto px-5'>
      <TopNav links={links} page={{ title: meta.title }} />
      <div className='bg-gray-100 rounded-2xl p-4'>
        <CoverImage
          title={meta.title}
          image={meta.image}
          className='rounded-2xl'
        />
        <div className='mt-1 text-sm leading-6 text-gray-700 sm:mt-2'>
          {tags}
        </div>
        <div className='prose prose-slate mx-auto'>{content}</div>
      </div>
    </div>
  )
}
