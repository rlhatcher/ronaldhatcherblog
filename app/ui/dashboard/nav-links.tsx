'use client'

import {
  IoDuplicateOutline,
  IoPeopleOutline,
  IoEyeOutline
} from 'react-icons/io5'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: IoEyeOutline },
  {
    name: 'My Rockets',
    href: '/dashboard/rockets',
    icon: IoDuplicateOutline
  },
  {
    name: 'Builds',
    href: '/dashboard/builds',
    icon: IoDuplicateOutline
  },
  {
    name: 'Kits',
    href: '/dashboard/kits',
    icon: IoPeopleOutline
  }
]

export default function NavLinks (): React.JSX.Element {
  const pathname = usePathname()
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-100 p-3 text-sm font-medium hover:bg-slate-200 hover:text-slate-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-slate-200 border-slate-800 border-2 text-slate-600': pathname === link.href
              }
            )}
          >
            <LinkIcon className='w-6' />
            <p className=' font-semibold hidden md:block'>{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
