import React from 'react'

import MotorTable from './motor-table'

import { MotorChart } from '@/components/motors/motor-chart'

function MotorDetails({ motor }: { motor: Motor }): React.JSX.Element {
  if (motor == null) {
    return <div>Motor details not available.</div>
  }
  const excludedKeys = [
    'samples',
    'thrustCurve',
    'motorId',
    'manufacturer',
    'updatedOn',
    'dataFiles',
  ]

  return (
    <div className="px-4 py-5 sm:px-0">
      <h3 className="text-lg font-semibold leading-7">Motor Information</h3>
      <p className="mt-1 max-w-2xl text-sm leading-6">
        Detailed view of the selected motor.
      </p>

      <div>
        <div>
          <MotorTable
            motor={motor}
            excludedKeys={excludedKeys}
          />
        </div>
        <div>
          {motor.thrustCurve != null && (
            <MotorChart samples={motor.thrustCurve} />
          )}
        </div>
      </div>
    </div>
  )
}

export default MotorDetails
