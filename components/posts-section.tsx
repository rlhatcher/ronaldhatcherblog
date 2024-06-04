import Link from 'next/link'
import React from 'react'

import { CloudImage } from './cloud-image'

import { badgeVariants } from '@/components/ui/badge'

export default function PostsSection({
  posts,
}: {
  posts: BlogPost[]
}): JSX.Element {
  return (
    <div className="[grid-area:posts]">
      <h2 className="mb-4 font-mono text-2xl font-semibold">
        <Link href="/posts">Posts</Link>
      </h2>
      <div className="mt-12">
        {posts.map(post => (
          <article
            key={post.meta.slug}
            className="flex flex-col items-start justify-between mb-4"
          >
            <div className="flex items-center gap-x-4 text-xs">
              <time
                dateTime={post.meta.date}
                className="text-gray-500"
              >
                {post.meta.date}
              </time>
              <Link
                href={`/tags/${post.meta.tags[0]}`}
                className={badgeVariants({ variant: 'outline' })}
              >
                {post.meta.tags[0]}
              </Link>
            </div>
            <Link
              href={`/posts/${post.meta.slug}`}
              key={post.meta.slug}
            >
              <div className="relative mt-2 flex items-center gap-x-4">
                <CloudImage
                  src={post.meta.image}
                  alt={post.meta.title}
                  className="h-10 w-10 rounded-full bg-gray-50"
                  width={100}
                  height={100}
                />
                <div className="leading-6">
                  <p className="font-semibold text-md text-gray-900">
                    {post.meta.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    {post.meta.description}
                  </p>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
