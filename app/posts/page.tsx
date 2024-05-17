import React from 'react'

import PostsSection from '@/components/posts-section'
import TopNav from '@/components/top-nav'
import { getPostsMeta } from '@/lib/github/posts'

export default async function PostsPage(): Promise<React.JSX.Element> {
  const posts = await getPostsMeta()

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <TopNav
        links={[]}
        page={{ title: 'Posts' }}
      />
      <PostsSection posts={posts} />
    </div>
  )
}
