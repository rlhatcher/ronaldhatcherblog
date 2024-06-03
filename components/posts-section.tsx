import Link from 'next/link'
import React from 'react'

import { EntryArtwork } from '@/components/entry-artwork'

export default function PostsSection({
  posts,
}: {
  posts: BlogPost[]
}): JSX.Element {
  return (
    <div className="[grid-area:posts]">
      <h2>Posts</h2>
      <div className="mt-12">
        {posts.map(post => (
          <article key={post.meta.slug}>
            <Link
              href={`/posts/${post.meta.slug}`}
              key={post.meta.slug}
            >
              <EntryArtwork
                key={post.meta.slug}
                meta={post.meta}
                className="w-[500]"
                aspectRatio="square"
                width={500}
                height={500}
              />
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
