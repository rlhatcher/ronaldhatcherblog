// MotorDetails.js or MotorDetails.jsx

import React from 'react'
import Link from 'next/link'
import { SamplesChart } from '@/app/ui/samples-chart'

function MotorDetails ({ motor }: { motor: Motor }): React.JSX.Element {
  if (motor == null) {
    return <div>Motor details not available.</div>
  }
  const excludedKeys = [
    'samples',
    'thrustCurve',
    'motorId',
    'manufacturer',
    'updatedOn',
    'dataFiles'
  ]

  return (
    <div>
      <div className='px-4 py-5 sm:px-0'>
        <h3 className='text-lg font-semibold leading-7 text-gray-900'>
          Motor Information
        </h3>
        <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
          Detailed view of the selected motor.
        </p>
      </div>

      <div className='mt-6'>
        <dl className='divide-y divide-gray-100 mx-auto'>
          {Object.entries(motor)
            .filter(([key]) => !excludedKeys.includes(key))
            .map(([key, value]) => {
              // Transform camelCase keys for display
              const formattedKey = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())

              return (
                <div
                  key={key}
                  className='px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'
                >
                  <dt className='text-sm font-medium text-gray-900'>
                    {formattedKey}
                  </dt>
                  <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                    {key === 'madeBy'
                      ? (
                      // If the key is 'madeBy', create a link using its 'id' and display its 'name'
                      <Link
                        href={`/refdata/manufacturers/${value.id}`}
                        className='text-blue-600 hover:text-blue-800'
                      >
                        {value.name}
                      </Link>
                        )
                      : value != null
                        ? (
                            value.toString()
                          )
                        : (
                            'undefined'
                          )}
                  </dd>
                </div>
              )
            })}
        </dl>
      </div>

      {/* Thrust Curve Chart, if available */}
      {motor.thrustCurve != null && motor.thrustCurve.length > 0 && (
        <SamplesChart samples={motor.thrustCurve} />
      )}
    </div>
  )
}

export default MotorDetails
