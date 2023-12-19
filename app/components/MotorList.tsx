import Link from 'next/link'
import React from 'react'

interface MotorListProps {
  motors: Motor[]
}

const MotorList: React.FC<MotorListProps> = ({ motors }) => {
  return (
    <div className='mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8  lg:max-w-none lg:grid-cols-3'>
      {motors.map((motor) => {
        return (
          <Link href={`/data/motors/${motor.motorId}`} key={motor.motorId} className='bg-gray-300 shadow-sm font-mono rounded-md p-2'>
            {motor.commonName} {motor.designation}
          </Link>
        )
      })}
    </div>
  )
}

export default MotorList
