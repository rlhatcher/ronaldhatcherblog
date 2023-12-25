import React from 'react'
import TopNav from '@/app/components/TopNav'
import KitCards from '@/app/components/KitCards'

export default async function KitsPage (): Promise<React.JSX.Element | never[]> {
  const links: BreadCrumb[] = [{ href: '/data', label: 'data' }]
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'kits' }} />
      <KitCards />
    </div>
  )
}
