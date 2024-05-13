import Link from 'next/link'
import React from 'react'

import { ScrollArea } from './ui/scroll-area'

import { EntryArtwork } from '@/components/entry-artwork'
import { Separator } from '@/components/ui/separator'

export default function PostsSection({
  posts,
}: {
  posts: BlogPost[]
}): JSX.Element {
  return (
    <>
      <div className="font-mono flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            <Link href="/posts">Blog Posts</Link>
          </h2>
          <p className="text-sm text-muted-foreground">All the latest info</p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {posts.map(post => (
              <Link
                href={`/posts/${post.meta.slug}`}
                key={post.meta.slug}
              >
                <EntryArtwork
                  key={post.meta.slug}
                  meta={post.meta}
                  className="w-[250px]"
                  aspectRatio="portrait"
                  width={500}
                  height={660}
                />
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
