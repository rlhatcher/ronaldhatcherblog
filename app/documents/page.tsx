import React from 'react'
import DocCards from '@/app/_components/DocCards'
import TopNav from '@/app/_components/TopNav'

export default function DocumentPage (): React.JSX.Element {
  const links: BreadCrumb[] = []
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Documents' }} />
      <div className='bg-gray-100 rounded-2xl p-4'>
        <section>
          <DocCards limit={30} />
        </section>
      </div>
    </div>
  )
}
