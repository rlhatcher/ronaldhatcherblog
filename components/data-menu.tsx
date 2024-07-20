'use client'

import { ArchiveIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function DataMenu(): JSX.Element {
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
        >
          <ArchiveIcon className="h-4 w-4" />
          <span className="sr-only">Data menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            router.push('/refdata/motors')
          }}
        >
          Rocket Motors
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push('/refdata/clubs')
          }}
        >
          Rocket Clubs
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push('/refdata/kits')
          }}
        >
          Rocket Kits
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
