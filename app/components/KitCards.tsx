import React from 'react'
import Link from 'next/link'
// import Image from 'next/image'
import { getKits } from '@/lib/neo4j'

export default async function KitCards ({
  limit
}: {
  limit?: number
}): Promise<React.JSX.Element | never[]> {
  const kits: Kit[] = await getKits()
  if (kits == null) return []

  return (
    <ul
    role='list'
    className='mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4  mx-auto'
  >      {kits.map((kit, index) => (
    <li
    key={`/${kit.model}`}
    className='col-span-1 flex rounded-md shadow-sm bg-slate-50'
  >
    {/* <div
      className={
        'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium bg-slate-100 text-slate-800'
      }
    >
      <Image height={50} width={50} src={kit.image} alt={`${kit.name} Image`} />
    </div> */}
    <div className='flex-1 truncate px-4 py-2 text-sm'>
      <Link
        href={`/data/kits/${kit.model}`}
        className='font-medium text-gray-900 hover:text-gray-600'
      >
        {kit.mfg_id} - {kit.name}
      </Link>
      {/* <p className="text-gray-500">{project.members} Members</p> */}
    </div>
  </li>
  ))}
</ul>)
}
