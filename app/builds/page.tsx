import React from 'react'

import BuildCards from '../_components/BuildCards'
import TopNav from '@/app/_components/top-nav'

export default async function BuildsPage (): Promise<React.JSX.Element> {
  return (
    <div className="container mx-auto px-5">
      <TopNav links={[
        { href: '/', label: 'Ω' }]}
        page={{ title: 'Builds' }} />
      <article>
        <div className="bg-gray-100 rounded-2xl py-4 sm:pt-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <BuildCards limit={30} />
          </div>
        </div>

      </article>
    </div>
  )
}
