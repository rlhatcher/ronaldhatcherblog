import React, { Suspense } from 'react'
import Profile from '@/app/ui/dashboard/profile'
import MyRockets from '@/app/ui/dashboard/my-rockets'
import {
  // RevenueChartSkeleton,
  LatestDesignsSkeleton
} from '@/app/ui/skeletons'

export default async function Page (): Promise<React.JSX.Element> {
  return (
    <main>
      <Profile />
      <Suspense fallback={<LatestDesignsSkeleton />}>
        <MyRockets />
      </Suspense>
    </main>
  )
}
