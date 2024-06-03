import Link from 'next/link'
import React from 'react'

export default function PostsSection({
  posts,
}: {
  posts: BlogPost[]
}): JSX.Element {
  return (
    <div className="[grid-area:posts]">
      <h2>
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
              {/* <EntryArtwork
                key={post.meta.slug}
                meta={post.meta}
                className="w-[500]"
                aspectRatio="square"
                width={500}
                height={500}
              /> */}
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
