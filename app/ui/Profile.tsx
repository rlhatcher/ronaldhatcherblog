/* eslint-disable @next/next/no-img-element */
/*
The profile retrieves identity information from the IDP and retrieves the person information from the graph.
*/
import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { mrgPerson } from '@/app/lib/neo4j'
import ProfileBar from './dashboard/profile-bar'

export default async function ProfilePage (): Promise<React.JSX.Element> {
  const { getUser } = getKindeServerSession()

  const user = await getUser()
  if (
    user?.id != null &&
    user.email != null &&
    user.given_name != null &&
    user.family_name != null &&
    user.picture != null
  ) {
    const person = await mrgPerson({
      id: user?.id,
      email: user?.email,
      given_name: user?.given_name,
      family_name: user?.family_name,
      picture: user?.picture
    })

    const fullName = person?.given_name + ' ' + person?.family_name

    return (
      <div className='bg-gray-100 p-2'>
        <ProfileBar name={fullName} />
        <section></section>
      </div>
    )
  } else {
    return <div></div>
  }
}
