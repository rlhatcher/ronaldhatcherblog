import React from 'react'
import ProjectCard from '@/app/_components/ProjectCard'
import { getProjectsMeta } from '@/lib/projects'

export default async function ProjectCards ({
  limit
}: {
  limit: number
}): Promise<React.JSX.Element | never[]> {
  const projects = await getProjectsMeta()
  if (projects == null) return []

  return (
    <div className='mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
      {projects.map((project) => (
        <ProjectCard project={project} key={project.meta.slug} />
      ))}
    </div>
  )
}
