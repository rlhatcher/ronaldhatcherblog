import React from 'react'
import { getKits } from '@/app/lib/neo4j'
import KitList from './KitList'

export default async function KitCards ({
  limit
}: {
  limit?: number
}): Promise<React.JSX.Element | never[]> {
  const kits: Kit[] = await getKits()
  if (kits == null) return []

  return <KitList kits={kits} />
}
