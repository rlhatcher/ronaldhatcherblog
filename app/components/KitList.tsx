import Link from 'next/link'
import React from 'react'

// Assuming the Kit interface is imported from types.d.ts
// import { Kit } from './path-to-your/types.d.ts';

interface KitListProps {
  kits: Kit[]
}

const KitList: React.FC<KitListProps> = ({ kits }) => {
  return (
    <div className='mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8  lg:max-w-none lg:grid-cols-3'>
      {kits.map((kit) => {
        return (
          <Link
            href={`/data/kits/${kit.uniqueID}`}
            key={kit.uniqueID}
            className='bg-gray-300 shadow-sm font-mono rounded-md p-2'
          >
            {kit.name}
          </Link>
        )
      })}
    </div>
  )
}

export default KitList
