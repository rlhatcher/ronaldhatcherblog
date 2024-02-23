import React from 'react'
import TopNav from '@/app/ui/TopNav'
import KitCards from '@/app/ui/kits/KitCards'

export default function KitsPage (): React.JSX.Element {
  const links: BreadCrumb[] = [{ href: '/refdata', label: 'data' }]
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'kits' }} />
      <KitCards />
    </div>
  )
}
