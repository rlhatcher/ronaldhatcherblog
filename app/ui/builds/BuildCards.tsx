import React from 'react'

import BuildList from './BuildList'

import { getBuildsMeta } from '@/lib/github/builds'

export default async function BuildCards({
  pageSize,
}: {
  pageSize?: number
}): Promise<React.JSX.Element> {
  const builds = await getBuildsMeta()
  if (builds == null) {
    return <div></div>
  }

  return <BuildList builds={builds} />
}
