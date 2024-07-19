import React from 'react'

import { BreadcrumbResponsive } from '@/components/bread-crumb'
import { BuildsSection } from '@/components/builds'
import { getBuilds } from '@/lib/github/builds'

export default async function BuildsPage(): Promise<React.JSX.Element> {
  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { label: 'builds' },
    { label: '🚀' },
  ]
  const builds = await getBuilds()

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
        <BuildsSection builds={builds} />
      </div>
    </div>
  )
}
