import NavLinks from './nav-links'
import {
  IoPowerOutline
} from 'react-icons/io5'
import React from 'react'

export default function SideNav (): React.JSX.Element {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">

      <div className="flex grow flex-row justify-between text-xl space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-slate-100 md:block"></div>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-slate-100 p-3 text-sm font-medium hover:bg-slate-200 hover:text-slate-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <IoPowerOutline className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  )
}
