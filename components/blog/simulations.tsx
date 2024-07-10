import React from 'react'

import 'highlight.js/styles/github-dark.css'
import DesignView from '@/components/design'
import { fetchDesign } from '@/lib/neo4j'

export const revalidate = 10

interface Props {
  designId: string
}

export default async function SimTabs({
  designId,
}: Props): Promise<JSX.Element> {
  const design = await fetchDesign(designId)

  return <div>{design != null && <DesignView design={design} />}</div>
}
