import React from 'react'
import TopNav from '@/app/ui/TopNav'
import MotorCards from '@/app/ui/MotorCards'

export default async function MotorsPage (): Promise<
React.JSX.Element | never[]
> {
  const links: BreadCrumb[] = [{ href: '/data', label: 'data' }]
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Motors' }} />
      <MotorCards />
    </div>
  )
}
