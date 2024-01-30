import React from 'react'
import TopNav from '@/app/ui/TopNav'

import { getKits, getKit } from '@/app/lib/neo4j'
import Link from 'next/link'

export const revalidate = 10

interface Props {
  params: {
    id: string
  }
}

export async function generateStaticParams (): Promise<Array<{ id: string }>> {
  const kits = await getKits()

  if (kits == null) return []

  return kits.map((kit) => ({
    id: kit.uniqueID
  }))
}

export async function generateMetadata ({
  params: { id }
}: Props): Promise<{ title: string }> {
  const kit = await getKit(id)

  if (kit == null) {
    return {
      title: 'kit Not Found'
    }
  }

  return {
    title: kit.mfgID + ' ' + kit.name
  }
}

export default async function KitPage ({
  params: { id }
}: Props): Promise<React.JSX.Element> {
  const kit = await getKit(id)

  if (kit == null) {
    return <div></div>
  }

  return (
    <div className='container mx-auto sm:px-8 lg:px-10'>
      <TopNav
        links={[
          { href: '/refdata', label: 'data' },
          { href: '/refdata/kits', label: 'kits' }
        ]}
        page={{ title: kit.mfgID + ' ' + kit.name }}
      />
      <Link
        href={`/refdata/manufacturers/${kit.mfgID}`}
        key={kit.mfgID}
        className='bg-gray-300 shadow-sm font-mono rounded-md p-1'
      >
        {' '}
        {kit.mfgID}{' '}
      </Link>
      <div className='border-t border-gray-100'>
        <dl className='divide-y divide-gray-100 mx-auto'>
          {Object.entries(kit).map(([key, value]) => (
            <div
              key={key}
              className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'
            >
              <dt className='text-sm font-medium text-gray-900'>
                {key.replace(/([A-Z])/g, ' $1')}
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {value == null ? 'undefined' : value.toString()}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
