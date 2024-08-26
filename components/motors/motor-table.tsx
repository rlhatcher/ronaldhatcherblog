import Link from 'next/link'
import React from 'react'

import { type Motor } from '@/schemas/Motors'

interface MotorTableProps {
  motor: Motor
  excludedKeys: string[]
}

const MotorTable: React.FC<MotorTableProps> = ({ motor, excludedKeys }) => {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-3 md:grid-cols-4 lg:mr-8">
      {Object.entries(motor)
        .filter(([key]) => !excludedKeys.includes(key))
        .map(([key, value]) => {
          // Transform camelCase keys for display
          const formattedKey = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())

          return (
            <div
              key={key}
              className="py-1"
            >
              <div className="flex items-center justify-between">
                <dt className="text-sm font-semibold">{formattedKey}</dt>
                <dd className="ml-4 mt-1 max-w-[50%] flex-1 text-right text-sm leading-6 sm:text-left">
                  {key === 'madeBy' &&
                  typeof value === 'object' &&
                  'id' in value ? (
                    <Link href={`/dashboard/manufacturers/${value.id}`}>
                      {value.name}
                    </Link>
                  ) : value != null ? (
                    // eslint-disable-next-line @typescript-eslint/no-base-to-string
                    value.toString()
                  ) : (
                    'undefined'
                  )}
                </dd>
              </div>
            </div>
          )
        })}
    </dl>
  )
}

export default MotorTable
