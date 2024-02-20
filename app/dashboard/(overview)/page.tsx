import React, { Suspense } from 'react'
import Profile from '@/app/ui/dashboard/profile'
import FlightCards from '@/app/ui/dashboard/flight-cards'
import {
  // RevenueChartSkeleton,
  LatestDesignsSkeleton
} from '@/app/ui/skeletons'

export default async function Page (): Promise<React.JSX.Element> {
  return (
    <main>
      <Profile />
      <Suspense fallback={<LatestDesignsSkeleton />}>
        <FlightCards />
      </Suspense>
    </main>
  )
}
