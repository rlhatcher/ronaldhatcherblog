// import React, { Suspense } from 'react'
// import Search from '@/app/ui/dashboard/search'
// import Table from '@/app/ui/table'
import Profile from '@/app/ui/dashboard/profile'
import { CreateRocket } from '@/app/ui/rockets/buttons'
import MyRockets from '@/app/ui/rockets/my-rockets'

// import { InvoicesTableSkeleton } from '@/app/ui/skeletons'

export default async function Page (): Promise<React.JSX.Element> {
  return (
    <main>
      <Profile />
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:items-center'>
          <div className='sm:flex-auto'>
            <h1 className='text-base font-semibold leading-6 text-gray-900'>
              My Rockets
            </h1>
            <p className='mt-2 text-sm text-gray-700'>
              A list of all the rockets in your fleet. You can create a new
              rocket by providing a name
            </p>
          </div>
          <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
            <CreateRocket />
          </div>
        </div>
        <MyRockets />
      </div>
    </main>
  )
}
