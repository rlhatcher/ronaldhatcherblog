import React from 'react'
import ProjectCards from '@/app/components/ProjectCards'
import TopNav from '@/app/components/TopNav'

export default function ProjectPage (): React.JSX.Element {
  const links: BreadCrumb[] = []
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Projects' }} />
      <div>
        <ProjectCards limit={30} />
      </div>
    </div>
  )
}
