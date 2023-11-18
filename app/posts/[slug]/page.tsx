import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import 'highlight.js/styles/github-dark.css'
import TopNav from '@/app/_components/top-nav'

import { getPostByName, getPostsMeta } from '@/lib/posts'
import CloudImage from '@/app/_components/CloudImage'
import Tag from '@/app/_components/Tag'

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
    <Link key={i} href={`/tags/${tag}`} className='p-1'>
      <Tag label={tag} />
    </Link>
  ))
  const links = [
    { href: '/posts', label: 'Posts' }
  ]

  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: meta.title }} />
      <div className='bg-gray-100 rounded-2xl'>
        <div>
          <CloudImage
            title={meta.title}
            image={meta.image}
            className='rounded-xl mx-auto w-full'
          />
        </div>
        <div className='mt-1 text-sm leading-6 text-gray-700 sm:mt-2'>
          {tags}
        </div>
        <div className='prose prose-slate mx-auto mt-2'>{content}</div>
      </div>
    </div>
  )
}
