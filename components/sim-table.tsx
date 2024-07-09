import Link from 'next/link'
import React from 'react'

interface SimTableProps {
  sim: Simulation
  excludedKeys: string[]
}

const SimTable: React.FC<SimTableProps> = ({ sim, excludedKeys }) => {
  return (
    <dl className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4 lg:mr-8">
      {Object.entries(sim)
        .filter(([key]) => !excludedKeys.includes(key))
        .map(([key, value]) => {
          // Transform camelCase keys for display
          const formattedKey = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())

          return (
            <div
              key={key}
              className="col-span-2 py-0"
            >
              <div className="flex items-center justify-between">
                <dt className="text-sm font-semibold">{formattedKey}</dt>
                <dd className="mt-0 text-sm leading-3">
                  {key === 'madeBy' && typeof value === 'object' ? (
                    <Link href={`/dashboard/manufacturers/${value.id}`}>
                      {value.name}
                    </Link>
                  ) : value != null ? (
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

export default SimTable
