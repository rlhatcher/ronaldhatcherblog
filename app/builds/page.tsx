import React from 'react'

import BuildsSection from '@/components/builds-section'
import TopNav from '@/components/top-nav'
import { getBuildsMeta } from '@/lib/github/builds'

export default async function BuildsPage(): Promise<React.JSX.Element> {
  const links: BreadCrumb[] = []
  const builds = await getBuildsMeta()

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <TopNav
        links={links}
        page={{ title: 'Builds' }}
      />
      <div>
        <section>
          <BuildsSection builds={builds} />
        </section>
      </div>
    </div>
  )
}
