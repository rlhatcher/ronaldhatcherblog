import React from 'react'

// import { BreadcrumbResponsive } from '@/components/bread-crumb'
import PostsSection from '@/components/posts-section'
import { getPostsMeta } from '@/lib/github/posts'

export default async function PostsPage(): Promise<React.JSX.Element> {
  const posts = await getPostsMeta()

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      {/* <BreadcrumbResponsive items={links} /> */}
      <PostsSection posts={posts} />
    </div>
  )
}
