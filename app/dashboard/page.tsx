import React from 'react'
import Profile from '../ui/dashboard/profile'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function Dashboard (): Promise<React.JSX.Element> {
  const { isAuthenticated } = getKindeServerSession()

  return (await isAuthenticated())
    ? (
    <Profile />
      )
    : (
    <div>
      This page is protected, please <LoginLink>Login</LoginLink> to view it
    </div>
      )
}
