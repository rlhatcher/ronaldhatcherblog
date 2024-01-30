import React from 'react'
import SideNav from '../ui/dashboard/side-nav'

export default function Layout ({
  children
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
      <div className='w-full flex-none md:w-64'>
        <SideNav />
      </div>
      <div className='flex-grow  md:overflow-y-auto md:p-4'>{children}</div>
    </div>
  )
}
