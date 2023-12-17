import React from 'react'
import { getMfgs, getMfgMakes } from '@/lib/neo4j'

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
  const mfg = await getMfgMakes(id)

  if (mfg == null) {
    return {
      title: 'Manufacturer Not Found'
    }
  }

  return {
    title: mfg.name
  }
}
