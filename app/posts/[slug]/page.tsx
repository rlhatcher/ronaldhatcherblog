import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import 'highlight.js/styles/github-dark.css'
import TopNav from '@/app/components/TopNav'

import { getPostByName, getPostsMeta } from '@/lib/posts'
import CloudImage from '@/app/components/CloudImage'
import Tag from '@/app/components/Tag'

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
    <div key={i}>
      <Link href={`/tags/${tag}`}>
        <Tag label={tag} />
      </Link>
    </div>
  ))

  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav
        links={[{ href: '/posts', label: 'Posts' }]}
        page={{ title: meta.title }}
      />
      <article className='relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900'>
        <CloudImage
          title={meta.title}
          image={meta.image}
          className='rounded-xl mx-auto w-full'
        />
        <div className='absolute bottom-5 left-0 right-0 w-full bg-gradient-to-r from-gray-900 to-transparent'>
          <h3 className='text-lg font-semibold leading-6 text-white'>
            {post.meta.description}
          </h3>
          <div className='container flex-wrap flex text-white flex-row font-mono justify-items-start gap-1 items-center px-5 py-2'>
            <h4>Project</h4>
            <Link href={`/projects/${post.meta.project}`}>
              <span className='inline-flex items-center rounded-md bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-900/100'>
                {post.meta.project}
              </span>
            </Link>
            <h4>Tags</h4>
            {tags}
          </div>
        </div>
      </article>
      <div className='prose prose-slate mx-auto max-w-full bg-white relative top-0  p-5 m:p-10'>
        {content}
      </div>
    </div>
  )
}
