import Link from 'next/link'
import React from 'react'

import { EntryArtwork } from '@/components/entry-artwork'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export default function PostsSection({
  posts,
}: {
  posts: BlogPost[]
}): JSX.Element {
  return (
    <div className="[grid-area:posts]">
      <div className="font-mono flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            <Link href="/posts">Posts</Link>
          </h2>
          <p className="text-sm text-muted-foreground">Articles and essays</p>
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
                  className="w-[500]"
                  aspectRatio="square"
                  width={500}
                  height={500}
                />
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
