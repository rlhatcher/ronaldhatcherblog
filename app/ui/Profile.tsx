/* eslint-disable @next/next/no-img-element */
/*
The profile retrieves identity information from the IDP and retrieves the person information from the graph.
*/
import React from 'react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { mrgPerson } from '@/lib/neo4j'

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

    const image =
      person?.picture != null
        ? person?.picture
        : 'https://via.placeholder.com/50'

    return (
      <div className='bg-gray-100 rounded-2xl p-4'>
        <section>
          <div className='mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none'>
            <div>
              <h2 className='text-base font-semibold leading-7 text-gray-900'>
                Profile
              </h2>
              <p className='mt-1 text-sm leading-6 text-gray-500'>
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <dl className='mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6'>
                <div className='pt-6 sm:flex'>
                  <dt className='font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6'>
                    Full Name
                  </dt>
                  <dd className='mt-1 flex justify-normal gap-x-6 sm:mt-0 sm:flex-auto'>
                    <div className='text-gray-900'>
                      {person?.given_name} {person?.family_name}
                    </div>
                    <button
                      type='button'
                      className='font-semibold text-indigo-600 hover:text-indigo-500'
                    >
                      Update
                    </button>
                  </dd>
                </div>
                <div className='pt-6 sm:flex'>
                  <dt className='font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6'>
                    Email address
                  </dt>
                  <dd className='mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto'>
                    <div className='text-gray-900'>{person?.email}</div>
                    <button
                      type='button'
                      className='font-semibold text-indigo-600 hover:text-indigo-500'
                    >
                      Update
                    </button>
                  </dd>
                </div>
                <div className='pt-6 sm:flex'>
                  <dt className='font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6'>
                    Image
                  </dt>
                  <dd className='mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto'>
                    <img
                      src={image}
                      alt='profile image'
                      className='rounded-full'
                      width={50}
                      height={50}
                    />
                    <button
                      type='button'
                      className='font-semibold text-indigo-600 hover:text-indigo-500'
                    >
                      Update
                    </button>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </div>
    )
  } else {
    return <div></div>
  }
}
