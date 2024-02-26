import React, { Suspense } from 'react'
import Profile from '@/app/ui/dashboard/profile'
import LatestRockets from '@/app/ui/dashboard/latest-rockets'
import {
  // RevenueChartSkeleton,
  LatestDesignsSkeleton
} from '@/app/ui/skeletons'

export default async function Page (): Promise<React.JSX.Element> {
  return (
    <main>
      <Profile />
      <Suspense fallback={<LatestDesignsSkeleton />}>
        <LatestRockets />
      </Suspense>
    </main>
  )
}
