import React from 'react'

import { BreadcrumbResponsive } from '@/components/bread-crumb'
import { PostsSection } from '@/components/posts'
import { getPosts } from '@/lib/github/posts'

export default async function PostsPage(): Promise<React.JSX.Element> {
  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { label: 'Updates' },
    { label: '🚀' },
  ]
  const posts = await getPosts()

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
        <PostsSection posts={posts} />
      </div>
    </div>
  )
}
