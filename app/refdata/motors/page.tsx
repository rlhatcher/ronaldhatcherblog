import React from 'react'

import { columns } from './columns'

import { DataTable } from '@/components/data-table'
import { getMotors } from '@/lib/neo4j'

export default async function MotorsPage(): Promise<React.JSX.Element> {
  const motors: Motor[] = await getMotors()
  if (motors == null) return <div></div>
  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <DataTable
        columns={columns}
        data={motors}
      />
    </div>
  )
}
