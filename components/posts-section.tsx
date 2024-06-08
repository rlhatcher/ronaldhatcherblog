import { SiGithub } from '@icons-pack/react-simple-icons'
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
            className="mb-4 flex flex-col items-start justify-between"
          >
            <div className="flex items-center gap-x-4 text-xs">
              <time
                dateTime={post.meta.date}
                className="text-gray-500"
              >
                {post.meta.date}
              </time>
              {post.meta.project !== undefined && (
                <Link
                  href={`/projects/${post.meta.project}`}
                  className={badgeVariants({ variant: 'outline' })}
                >
                  Project
                </Link>
              )}
              {post.meta.build !== undefined && (
                <Link
                  href={`/builds/${post.meta.build}`}
                  className={badgeVariants({ variant: 'outline' })}
                >
                  Build
                </Link>
              )}
              {post.meta.repo !== undefined && (
                <Link
                  href={post.meta.repo}
                  className={badgeVariants({ variant: 'outline' })}
                >
                  <SiGithub size={13} />
                  <span className="ml-1">Files</span>
                </Link>
              )}
            </div>
            <p className="text-md font-semibold text-gray-900">
              {post.meta.title}
            </p>
            <Link
              href={`/posts/${post.meta.slug}`}
              key={post.meta.slug}
            >
              <div className="relative mt-2 flex items-center gap-x-4">
                <CloudImage
                  src={post.meta.image}
                  alt={post.meta.title}
                  className="h-10 w-10 rounded-sm bg-gray-50"
                  width={100}
                  height={100}
                />
                <div className="leading-6">
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
