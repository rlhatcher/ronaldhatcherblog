import React from 'react'
import TopNav from '@/app/components/TopNav'
import PostCards from '../components/PostCards'
// fix my fat layout
export default function PostsPage (): React.JSX.Element {
  const links: BreadCrumb[] = []
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
