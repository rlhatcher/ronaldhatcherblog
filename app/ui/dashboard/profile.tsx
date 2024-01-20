/* eslint-disable @next/next/no-img-element */
/*
The profile retrieves identity information from the IDP and retrieves the person information from the graph.
*/
import React from 'react'

import ProfileBar from './profile-bar'
import { getUser } from '../../lib/kinde'

export default async function ProfilePage (): Promise<React.JSX.Element> {
  const user: Person = await getUser()

  return (
    <div className='bg-slate-200 p-2'>
      <ProfileBar name={user.given_name + ' ' + user.family_name} />
      <section></section>
    </div>
  )
}
