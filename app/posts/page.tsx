import React from 'react'

import { BreadcrumbResponsive } from '@/components/bread-crumb'
import { PostsSection } from '@/components/posts'
import { ModelViewer } from '@/components/stl'
import { getPostsMeta } from '@/lib/github/posts'

export default async function PostsPage(): Promise<React.JSX.Element> {
  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { label: 'Posts' },
    { label: '🚀' },
  ]
  const posts = await getPostsMeta()

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <ModelViewer
        filePath="files/nose_haak.stl"
        style={{ height: '50vh' }}
        orbitControls
        shadows
      />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
        <PostsSection posts={posts} />
      </div>
    </div>
  )
}
