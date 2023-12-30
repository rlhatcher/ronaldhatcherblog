import React from 'react'
import TopNav from '@/app/components/TopNav'
import Profile from '../components/Profile'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function Dashboard (): Promise<React.JSX.Element> {
  const links: BreadCrumb[] = []
  const { isAuthenticated } = getKindeServerSession()

  return (await isAuthenticated())
    ? (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Profile' }} />
      <Profile />
    </div>
      )
    : (
    <div className='container mx-auto sm:px-6 lg:px-8'>
      <TopNav links={links} page={{ title: 'Profile' }} />
      This page is protected, please <LoginLink>Login</LoginLink> to view it
    </div>
      )
}
