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
      <MyRockets />
      <div className='mt-6 flex items-center justify-end gap-x-6'>
      <CreateRocket />
      </div>
    </main>
  )
}
