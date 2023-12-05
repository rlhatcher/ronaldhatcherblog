import React from 'react'
import DocCards from '@/app/components/DocCards'
import TopNav from '@/app/components/TopNav'

export default async function DocumentPage (): Promise<React.JSX.Element | never[]> {
  const links: BreadCrumb[] = []
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Documents' }} />
      <div className='bg-gray-100 rounded-2xl p-4'>
        <section>
          <DocCards />
        </section>
      </div>
    </div>
  )
}
