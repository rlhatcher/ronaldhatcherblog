import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/ui/table'
import { CreateConfig } from './buttons' // Assuming CreateConfig is a button or component you want to show when there are no simulations.

export default function SimList ({
  listItems = [],
  designId,
  configId,
  label
}: {
  listItems: Simulation[] | undefined
  designId: string
  configId: string
  label: string
}): React.JSX.Element {
  if (listItems.length === 0) {
    return <CreateConfig />
  }

  return (
    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='text-sm font-medium leading-6 text-gray-900'>{label}</dt>
      <dd className='mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
        <Table className='[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]'>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Max Altitude</TableHeader>
              <TableHeader>Max Velocity</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((sim) => (
              <TableRow
                key={sim.id}
                href={`/dashboard/designs/${designId}/configs/${configId}/simulations/${sim.id}`}
              >
                <TableCell className='font-medium'>{sim.name}</TableCell>
                <TableCell>{sim.maxaltitude}</TableCell>
                <TableCell>{sim.maxvelocity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </dd>
    </div>
  )
}
