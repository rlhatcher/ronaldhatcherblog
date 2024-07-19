import React from 'react'

import { BreadcrumbResponsive } from '@/components/bread-crumb'
import { UpdatesSection } from '@/components/updates'
import { getUpdates } from '@/lib/github/updates'

export default async function UpdatesPage(): Promise<React.JSX.Element> {
  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { label: 'Updates' },
    { label: '🚀' },
  ]
  const updates = await getUpdates()

  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
        <UpdatesSection updates={updates} />
      </div>
    </div>
  )
}
