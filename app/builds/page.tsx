import React from 'react'
import BuildCards from '../ui/builds/BuildCards'
import TopNav from '@/app/ui/TopNav'

export default function BuildsPage (): React.JSX.Element {
  const links: BreadCrumb[] = []
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Builds' }} />
      <div>
        <section>
          <BuildCards />
        </section>
      </div>
    </div>
  )
}
