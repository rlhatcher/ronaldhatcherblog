'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'

function fixIt(x: number): string {
  return x.toFixed(2)
}

export const columns: Array<ColumnDef<Motor>> = [
  {
    accessorKey: 'motorId',
    header: 'ID',
  },
  {
    accessorKey: 'commonName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc')
          }}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    header: 'Manufacturer',
    accessorKey: 'madeBy.id',
  },
  {
    accessorKey: 'totImpulseNs',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === 'asc')
        }}
      >
        <div className="text-right">Impulse (N·s)</div>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
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
]
