'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'

import { DataTableColumnHeader } from './column-header'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function fixIt(x: number): string {
  return x.toFixed(2)
}

export const columns: Array<ColumnDef<Motor>> = [
  {
    accessorKey: 'commonName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
  },
  {
    header: 'Manufacturer',
    accessorKey: 'madeBy.id',
  },
  {
    accessorKey: 'totImpulseNs',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Impulse (N·s)"
      />
    ),
    cell: row => {
      const impulse = row.getValue() as number
      return <div className="text-right font-medium">{fixIt(impulse)}</div>
    },
  },
  {
    accessorKey: 'avgThrustN',
    header: () => <div className="text-right">Avg Thrust (N)</div>,
    cell: row => {
      const thrust = row.getValue() as number
      return <div className="text-right font-medium">{fixIt(thrust)}</div>
    },
  },
  {
    accessorKey: 'burnTimeS',
    header: () => <div className="text-right">Burn Time (s)</div>,
    cell: row => {
      const burn = row.getValue() as number
      return <div className="text-right font-medium">{fixIt(burn)}</div>
    },
  },
  {
    accessorKey: 'diameter',
    header: () => <div className="text-right">Dia (mm)</div>,
    cell: row => {
      const dia = row.getValue() as number
      return <div className="text-right font-medium">{fixIt(dia)}</div>
    },
  },
  {
    accessorKey: 'length',
    header: () => <div className="text-right">Len (mm)</div>,
    cell: row => {
      const len = row.getValue() as number
      return <div className="text-right font-medium">{fixIt(len)}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const motor = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                void navigator.clipboard.writeText(motor.motorId)
              }}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
