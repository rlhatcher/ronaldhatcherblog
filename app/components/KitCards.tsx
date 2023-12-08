import React from 'react'
import Link from 'next/link'
import { getKits } from '@/lib/neo4j'

export default async function KitCards ({
  limit
}: {
  limit?: number
}): Promise<React.JSX.Element | never[]> {
  const kits: Kit[] = await getKits()
  if (kits == null) return []

  return (
    <div className='mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8  lg:max-w-none lg:grid-cols-3'>
      {kits.map((kit) => {
        return (
          <Link href={`/data/kits/${kit.model}`} key={kit.model} className='bg-gray-300 shadow-sm font-mono rounded-md p-2'>
            {kit.mfg_id} {kit.name}
          </Link>
        )
      })}
    </div>
  )
}
