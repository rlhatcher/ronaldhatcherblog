import React from 'react'

import 'highlight.js/styles/github-dark.css'
import { BreadcrumbResponsive } from '@/components/bread-crumb'
import { BlogImage } from '@/components/cloud-image'

export const revalidate = 10

interface Props {
  params: {
    id: string[]
  }
}

export default async function Image({
  params: { id },
}: Props): Promise<React.JSX.Element> {
  const publicId = id.join('/')

  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { href: '/posts', label: 'Posts' },
    // { label: meta.title },
  ]

  return (
    <div className="container mx-auto sm:px-8 lg:px-10">
      <BreadcrumbResponsive items={links} />
      <BlogImage
        src={publicId}
        width="800"
        height="600"
        alt="TBD"
      />
    </div>
  )
}
