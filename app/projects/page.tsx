import React from 'react'
import ProjectCards from '@/app/_components/ProjectCards'
import TopNav from '@/app/_components/TopNav'

export default function ProjectPage (): React.JSX.Element {
  const links: BreadCrumb[] = []
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Projects' }} />
      <div className='bg-gray-100 rounded-2xl p-4'>
        <section>
          <ProjectCards limit={30} />
        </section>
      </div>
    </div>
  )
}
