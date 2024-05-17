import React from 'react'

import { BreadcrumbResponsive } from '@/components/bread-crumb'
import BuildsSection from '@/components/builds-section'
import { getBuildsMeta } from '@/lib/github/builds'

export default async function BuildsPage(): Promise<React.JSX.Element> {
  const links: BreadCrumb[] = []
  const builds = await getBuildsMeta()

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <div>
        <section>
          <BuildsSection builds={builds} />
        </section>
      </div>
    </div>
  )
}
