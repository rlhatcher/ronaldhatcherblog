import React from 'react'
import ProjectList from './ProjectList'

export default async function ProjectCards ({
  projects
}: {
  projects: Project[]
}): Promise<React.JSX.Element | never[]> {
  if (projects == null) return []

  return (
    <ProjectList projects={projects} />
  )
}
