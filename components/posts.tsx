import { SiGithub } from '@icons-pack/react-simple-icons'
import Link from 'next/link'
import React from 'react'

import { CloudImage } from './cloud-image'
import { EntryArtwork } from './entry-artwork'

import { badgeVariants } from '@/components/ui/badge'

export function PostsList({ posts }: { posts: BlogPost[] }): JSX.Element {
  return (
    <div className="[grid-area:posts]">
      <h2 className="mb-4 font-mono text-2xl font-semibold">
        <Link href="/posts">Posts</Link>
      </h2>
      <div>
        {posts.map(post => (
          <article
            key={post.meta.slug}
            className="mb-2 flex flex-col items-start justify-between border-b pb-2"
          >
            <div className="mb-1 flex items-center gap-x-4 text-xs">
              <time dateTime={post.meta.date}>{post.meta.date}</time>
              {post.meta.project !== undefined && (
                <Link
                  href={`/projects/${post.meta.project}`}
                  className={badgeVariants({ variant: 'secondary' })}
                >
                  Project
                </Link>
              )}
              {post.meta.build !== undefined && (
                <Link
                  href={`/builds/${post.meta.build}`}
                  className={badgeVariants({ variant: 'secondary' })}
                >
                  Build
                </Link>
              )}
              {post.meta.repo !== undefined && (
                <Link
                  href={post.meta.repo}
                  className={badgeVariants({ variant: 'secondary' })}
                >
                  <SiGithub size={13} />
                  <span className="ml-1">Files</span>
                </Link>
              )}
            </div>
            <p className="text-md font-semibold">{post.meta.title}</p>
            <Link
              href={`/posts/${post.meta.slug}`}
              key={post.meta.slug}
            >
              <div className="relative mt-2 flex items-center gap-x-4">
                <CloudImage
                  src={post.meta.image}
                  alt={post.meta.title}
                  className="h-10 w-10 rounded-sm"
                  width={100}
                  height={100}
                />
                <div className="leading-6">
                  <p className="text-xs">{post.meta.description}</p>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export function PostsSection({ posts }: { posts: BlogPost[] }): JSX.Element {
  return (
    <>
      {posts.map(post => (
        <article
          key={post.meta.slug}
          className="flex flex-col items-center p-4"
        >
          <Link
            href={`/posts/${post.meta.slug}`}
            key={post.meta.slug}
            className="flex w-full max-w-[500px] flex-col items-center"
          >
            <EntryArtwork
              key={post.meta.slug}
              meta={post.meta}
              className="h-full"
              aspectRatio="square"
              width={500}
              height={500}
            />
            <div className="w-full max-w-xs">
              <h3 className="mt-3 text-center font-medium leading-none">
                {post.meta.title}
              </h3>
              <p className="mt-1 text-center text-xs text-muted-foreground">
                {post.meta.description}
              </p>
            </div>
          </Link>
        </article>
      ))}
    </>
  )
}
