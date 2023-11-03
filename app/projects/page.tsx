import React from 'react'
import ProjectCards from '@/app/_components/ProjectCards'
import TopNav from '@/app/_components/top-nav'

export default async function ProjectPage (): Promise<React.JSX.Element> {
  return (
    <div className='container mx-auto'>
      <TopNav
        links={[{ href: '/', label: 'Ω' }]}
        page={{ title: 'Projects' }}
      />
      <div className='bg-gray-100 rounded-2xl p-4'>
        <section>
          <ProjectCards limit={30} />
        </section>
      </div>
    </div>
  )
}
