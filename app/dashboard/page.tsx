import React from 'react'
import Profile from '../ui/dashboard/profile'
import FlightCards from '../ui/dashboard/flight-cards'

export default async function Page (): Promise<React.JSX.Element> {
  return (
    <main>
      <Profile />
      <FlightCards />
    </main>
  )
}
