import React from 'react'
import BuildCards from '../_components/BuildCards'
import TopNav from '@/app/_components/top-nav'

export default async function BuildsPage (): Promise<React.JSX.Element> {
  const links = [
    { href: '/', label: 'Ω' }
  ]

  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Builds' }} />
      <div className='bg-gray-100 rounded-2xl p-4'>
        <BuildCards limit={30} />
      </div>
    </div>
  )
}
