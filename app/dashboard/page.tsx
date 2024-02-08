import React from 'react'
import Profile from '../ui/dashboard/profile'
import MfgSummary from '../ui/dashboard/mfg-summary'

export default async function Page (): Promise<React.JSX.Element> {
  return (
    <main>
      <Profile />
      <MfgSummary />
    </main>
  )
}
