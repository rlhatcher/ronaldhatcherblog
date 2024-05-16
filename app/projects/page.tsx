import React from 'react'

import ProjectCards from '@/app/ui/projects/ProjectCards'
import TopNav from '@/components/top-nav'
import { getProjectsMeta } from '@/lib/github/projects'

export default async function ProjectPage(): Promise<React.JSX.Element> {
  const links: BreadCrumb[] = []
  const projects = await getProjectsMeta()
  return (
    <div className="container mx-auto sm:px-6 lg:px-8">
      <TopNav
        links={links}
        page={{ title: 'Projects' }}
      />
      <div>
        <ProjectCards projects={projects} />
      </div>
    </div>
  )
}
