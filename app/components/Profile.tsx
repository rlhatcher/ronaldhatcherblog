'use client'
import React from 'react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
// import CloudImage from '@/app/_components/CloudImage'

export default function ProfilePage (): React.JSX.Element {
  const {
    isLoading,
    user
  } = useKindeBrowserClient()

  if (isLoading === true) return <div>Loading...</div>
  const image = (user?.picture != null) ? user?.picture : 'https://via.placeholder.com/50'

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
                Full name
              </dt>
              <dd className='mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto'>
                <div className='text-gray-900'>{user?.given_name} {user?.family_name}</div>
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
                <div className='text-gray-900'>{user?.email}</div>
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
                <img src={image} alt='profile image' className='rounded-full' />
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
}