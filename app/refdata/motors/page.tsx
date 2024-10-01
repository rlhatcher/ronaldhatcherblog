import React from 'react'

import { columns } from './columns'
import { DataTable } from './data-table'

import { BreadcrumbResponsive } from '@/components/bread-crumb'
import { readMotor } from '@/lib/neo4j'

export default async function MotorsPage(): Promise<React.JSX.Element> {
  const motors: Motor[] = await readMotor()
  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { href: '/refdata', label: 'Reference' },
    { label: 'Motors' },
  ]
  if (motors == null) return <div></div>
  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <DataTable
        columns={columns}
        data={motors}
      />
    </div>
  )
}
