'use client'

import { type ColumnDef } from '@tanstack/react-table'
// import { Divide } from 'lucide-react'
import React from 'react'

import { DataTableColumnHeader } from './data-table-column-header'

// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { Checkbox } from '@/components/ui/checkbox'

function fixIt(x: number): string {
  return x.toFixed(2)
}

export const columns: Array<ColumnDef<Motor>> = [
  {
    accessorKey: 'motorId',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ID"
      />
    ),
    cell: ({ row }) => <div>{row.getValue('motorId')}</div>,
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'commonName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'madeBy.name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Manufacturer"
      />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'impulseClass',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Class"
      />
    ),
    cell: ({ row }) => {
      const impulseClass = row.getValue<string>('impulseClass')
      if (['H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'].includes(impulseClass)) {
        return 'HPR'
      } else if (['E', 'F', 'G'].includes(impulseClass)) {
        return 'MPR'
      } else if (['A', 'B', 'C', 'D'].includes(impulseClass)) {
        return 'LPR'
      } else {
        return impulseClass // Default case, if any
      }
    },
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
      return <div>{fixIt(impulse)}</div>
    },
  },
  {
    accessorKey: 'avgThrustN',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Avg Thrust (N)"
      />
    ),
    cell: row => {
      const thrust = row.getValue() as number
      return <div>{fixIt(thrust)}</div>
    },
  },
  {
    accessorKey: 'burnTimeS',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Burn Time (s)"
      />
    ),
    cell: row => {
      const burn = row.getValue() as number
      return <div>{fixIt(burn)}</div>
    },
  },
  {
    accessorKey: 'diameter',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Diameter"
      />
    ),
    cell: row => {
      const dia = row.getValue() as number
      return <div>{fixIt(dia)}</div>
    },
  },
  {
    accessorKey: 'length',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Length (mm)"
      />
    ),
    cell: row => {
      const len = row.getValue() as number
      return <div>{fixIt(len)}</div>
    },
  },
]
