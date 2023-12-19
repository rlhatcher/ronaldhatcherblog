import React from 'react'
import { getMfgs, getMfgMakes } from '@/lib/neo4j'
import TopNav from '@/app/components/TopNav'
import MfgCard from '@/app/components/MfgCard'

export const revalidate = 10

interface Props {
  params: {
    id: string
  }
}

export async function generateStaticParams (): Promise<Array<{ id: string }>> {
  const mfgs = await getMfgs()

  if (mfgs == null) return []

  return mfgs.map((mfg) => ({
    id: mfg.mfgID
  }))
}

export async function generateMetadata ({
  params: { id }
}: Props): Promise<{ title: string }> {
  const mfg: Manufacturer | null = await getMfgMakes(id)

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
  const mfg: Manufacturer | null = await getMfgMakes(id)

  if (mfg == null) {
    return <div></div>
  }

  const mfgData = JSON.parse(JSON.stringify(mfg))

  return (
    <div className='container mx-auto sm:px-8 lg:px-10'>
      <TopNav
        links={[{ href: '/data', label: 'data' }, { href: '/data/manufacturers', label: 'manufacturers' }]}
        page={{ title: mfg.name }}
      />
      <div className='border-t border-gray-100'>
        <MfgCard manufacturer={mfgData}/>
      </div>
    </div>
  )
}
