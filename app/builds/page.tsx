import React from 'react'
import BuildCards from '../_components/BuildCards'
import TopNav from '@/app/_components/TopNav'
// Fix my fat layout
export default function BuildsPage (): React.JSX.Element {
  const links: BreadCrumb[] = []
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Builds' }} />
      <div className='bg-gray-100 rounded-2xl p-4'>
        <section>
          <BuildCards limit={30} />
        </section>
      </div>
    </div>
  )
}
