import React from 'react'

import MotorTable from './motor-table'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

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
    'infoUrl',
    'certOrg',
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {motor.madeBy.name} {motor.designation}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="px-4 py-5 sm:px-0">
          <div>
            <div>
              <MotorTable
                motor={motor}
                excludedKeys={excludedKeys}
              />
            </div>
            {motor.thrustCurve != null && (
              <MotorChart samples={motor.thrustCurve} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MotorDetails
