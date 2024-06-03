import Link from 'next/link'
import React from 'react'

export default function PostsSection({
  posts,
}: {
  posts: BlogPost[]
}): JSX.Element {
  return (
    <div className="[grid-area:posts]">
      <h2 className="text-2xl font-semibold font-mono mb-4">
        <Link href="/posts">Posts</Link>
      </h2>
      <div>
        {posts.map(post => (
          <article
            key={post.meta.slug}
            className="flex"
          >
            <Link
              href={`/posts/${post.meta.slug}`}
              key={post.meta.slug}
            >
              <h3 className="text-destructive">{post.meta.title}</h3>
              <p className="mt-4">{post.meta.description}</p>
              <div>Read more</div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
