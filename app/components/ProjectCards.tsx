import React from 'react'
import ProjectList from './ProjectList'
import { getProjectsMeta } from '@/lib/projects'

export default async function ProjectCards ({
  limit
}: {
  limit: number
}): Promise<React.JSX.Element | never[]> {
  const projects = await getProjectsMeta()
  if (projects == null) return []

  return (
    <ProjectList projects={projects} />
  )
}
