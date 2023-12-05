import React from 'react'
import TopNav from '@/app/components/TopNav'
import Profile from '../components/Profile'
// fix my fat layout
export default function Dashboard (): React.JSX.Element {
  const links: BreadCrumb[] = []
  return (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Profile' }} />
      <Profile />
    </div>
  )
}
