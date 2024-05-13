import React from 'react'

import TopNav from '@/app/ui/TopNav'
import PostsSection from '@/components/posts-section'
import { getPostsMeta } from '@/lib/github/posts'

export default async function PostsPage(): Promise<React.JSX.Element> {
  const links: BreadCrumb[] = []
  const posts = await getPostsMeta()

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <TopNav
        links={links}
        page={{ title: 'Posts' }}
      />
      <PostsSection posts={posts} />
    </div>
  )
}
