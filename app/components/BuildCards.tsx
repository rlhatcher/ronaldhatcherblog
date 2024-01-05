import React from 'react'
import { getBuildsMeta } from '@/lib/github/builds'
import BuildList from './BuildList'

export default async function BuildCards ({
  pageSize
}: {
  pageSize?: number
}): Promise<React.JSX.Element> {
  const builds = await getBuildsMeta()
  if (builds == null) {
    return (
    <div></div>
    )
  }

  return (
        <BuildList builds={builds} />
  )
}
