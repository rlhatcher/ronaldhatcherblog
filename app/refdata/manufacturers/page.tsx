import React from 'react'
import TopNav from '@/app/ui/TopNav'
import MfgCards from '@/app/ui/data/MfgCards'

export default async function ManufacturerPage (): Promise<
React.JSX.Element | never[]
> {
  const links: BreadCrumb[] = [{ href: '/refdata', label: 'data' }]
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Manufacturers' }} />
      <MfgCards />
    </div>
  )
}
