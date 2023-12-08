import React from 'react'
import TopNav from '@/app/components/TopNav'
import MotorCards from '@/app/components/MotorCards'

export default async function MotorsPage (): Promise<React.JSX.Element | never[]> {
  const links: BreadCrumb[] = []
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Motors' }} />
      <div className='bg-gray-100 rounded-2xl p-4'>
        <section>
          <MotorCards />
        </section>
      </div>
    </div>
  )
}
