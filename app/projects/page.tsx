import React from 'react'

import { BreadcrumbResponsive } from '@/components/bread-crumb'
import ProjectsSection from '@/components/projects'
import { getProjectsMeta } from '@/lib/github/projects'

export default async function ProjectPage(): Promise<React.JSX.Element> {
  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { label: 'Projects' },
    { label: '🚀' },
  ]
  const projects = await getProjectsMeta()
  return (
    <div>
      <BreadcrumbResponsive items={links} />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
        <ProjectsSection projects={projects} />
      </div>
    </div>
  )
}
