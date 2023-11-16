import React from 'react'
import TopNav from '@/app/_components/top-nav'
import PostCards from '../_components/PostCards'

export default function PostsPage (): React.JSX.Element {
  const links = [{
    href: '/',
    label: 'Ω'
  }]
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Posts' }} />
      <div className='bg-gray-100 rounded-2xl p-4'>
        <section>
          <PostCards limit={30} />
        </section>
      </div>
    </div>
  )
}
