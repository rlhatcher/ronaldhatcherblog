/* eslint-disable @next/next/no-img-element */
/*
The profile retrieves identity information from the IDP and retrieves the person information from the graph.
*/
import React from 'react'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

import ProfileBar from './profile-bar'
import { getUser } from '../../lib/kinde'

export default async function ProfilePage (): Promise<React.JSX.Element> {
  const { isAuthenticated } = getKindeServerSession()
  const user: Person = await getUser()

  return ((await isAuthenticated())
    ? (
    <div className='bg-slate-200 p-2'>
      <ProfileBar name={user.given_name + ' ' + user.family_name} />
      <section></section>
    </div>

      )
    : (
  <div>
    This page is protected, please <LoginLink>Login</LoginLink> to view it
  </div>
      )

  )
}
