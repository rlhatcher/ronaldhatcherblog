import React from 'react'
import TopNav from '@/app/components/TopNav'
import MfgCards from '@/app/components/MfgCards'

export default async function ManufacturerPage (): Promise<React.JSX.Element | never[]> {
  const links: BreadCrumb[] = []
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Manufacturers' }} />
      <div className='bg-gray-100 rounded-2xl p-4'>
        <section>
          <MfgCards />
        </section>
      </div>
    </div>
  )
}
