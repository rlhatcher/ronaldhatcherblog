import React from 'react'
import Link from 'next/link'
import { getManufacturers } from '@/lib/neo4j'

export const revalidate = 360

export default async function MfgCards ({
  limit
}: {
  limit?: number
}): Promise<React.JSX.Element | never[]> {
  const manufacturers = await getManufacturers()

  if (manufacturers == null) return []

  return (
    <div className='mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8  lg:max-w-none lg:grid-cols-3'>
      {manufacturers.map((manufacturer) => {
        return (
          <Link
            href={`/data/manufacturers/${manufacturer.mfgID}`}
            key={manufacturer.mfgID}
            className='bg-slate-200 border-l-8 border-slate-400 shadow-sm font-mono rounded-md p-2'
          >
            {manufacturer.name}
          </Link>
        )
      })}
    </div>
  )
}
