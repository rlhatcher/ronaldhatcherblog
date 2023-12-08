import React from 'react'
import Link from 'next/link'
import { getMfgs } from '@/lib/neo4j'

export default async function MfgcCards ({
  limit
}: {
  limit?: number
}): Promise<React.JSX.Element | never[]> {
  const manufacturers = await getMfgs()
  if (manufacturers == null) return []

  return (
    <div className='mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8  lg:max-w-none lg:grid-cols-3'>
      {manufacturers.map((manufacturer) => {
        return (
          <Link href={`/data/manufacturers/${manufacturer}`} key={manufacturer} className='bg-gray-300 shadow-sm font-mono rounded-md p-2'>
            {manufacturer}
          </Link>
        )
      })}
    </div>
  )
}
