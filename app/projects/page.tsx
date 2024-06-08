import React from 'react'

import { BreadcrumbResponsive } from '@/components/bread-crumb'
import ProjectCards from '@/components/project-cards'
import { getProjectsMeta } from '@/lib/github/projects'

export default async function ProjectPage(): Promise<React.JSX.Element> {
  const links: BreadCrumb[] = []
  const projects = await getProjectsMeta()
  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <BreadcrumbResponsive items={links} />
      <div>
        <ProjectCards projects={projects} />
      </div>
    </div>
  )
}
