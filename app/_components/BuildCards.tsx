import React from 'react'
import BuildCard from './BuildCard'
import { getBuildsMeta } from '@/lib/builds'

export default async function BuildCards ({
  limit
}: {
  limit: number
}): Promise<React.JSX.Element | never[]> {
  const builds = await getBuildsMeta()
  if (builds == null) return []

  return (
    <div className='mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
      {builds.map((build) => (
        <BuildCard build={build} key={build.meta.slug} />
      ))}
    </div>
  )
}
