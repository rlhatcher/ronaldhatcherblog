import Link from 'next/link'
import React from 'react'

interface MotorTableProps {
  motor: Motor
  excludedKeys: string[]
}

const MotorTable: React.FC<MotorTableProps> = ({ motor, excludedKeys }) => {
  return (
    <dl className="divide-y lg:mr-8">
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
                <dd className="mt-1 text-sm leading-6">
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

export default MotorTable
