import React from 'react'
import { getManufacturers, getManufacturer } from '@/app/lib/neo4j'
import TopNav from '@/app/ui/TopNav'
import MfgCard from '@/app/ui/data/MfgCard'

export const revalidate = 360

interface Props {
  params: {
    id: string
  }
}

export async function generateStaticParams (): Promise<Array<{ id: string }>> {
  const mfgs = await getManufacturers()

  if (mfgs == null) return []

  return mfgs.map((mfg) => ({
    id: mfg.id
  }))
}

export async function generateMetadata ({
  params: { id }
}: Props): Promise<{ title: string }> {
  const mfg: Manufacturer | null = await getManufacturer(id)

  if (mfg == null) {
    return {
      title: 'Manufacturer Not Found'
    }
  }

  return {
    title: mfg.name
  }
}

export default async function MfgPage ({
  params: { id }
}: Props): Promise<React.JSX.Element> {
  const mfg: Manufacturer | null = await getManufacturer(id)

  if (mfg == null) {
    return <div></div>
  }

  const mfgData = JSON.parse(JSON.stringify(mfg))

  return (
    <div className='container mx-auto sm:px-8 lg:px-10'>
      <TopNav
        links={[{ href: '/refdata', label: 'data' }, { href: '/refdata/manufacturers', label: 'manufacturers' }]}
        page={{ title: mfg.name }}
      />
      <div className='border-t border-gray-100'>
        <MfgCard manufacturer={mfgData}/>
      </div>
    </div>
  )
}
