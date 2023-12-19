import Link from 'next/link'
import React from 'react'
import Tag from './Tag'

interface MotorListProps {
  motors: Motor[]
}

const MotorList: React.FC<MotorListProps> = ({ motors }) => {
  return (
    <div className='mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8  lg:max-w-none lg:grid-cols-3'>
      {motors.map((motor) => {
        return (
          <Link
            href={`/data/motors/${motor.motorId}`}
            key={motor.motorId}
            className='bg-gray-300 shadow-sm font-mono rounded-md p-2'
          >
            <div className='flex justify-between'>
              <span>
                {motor.commonName} {motor.designation}
              </span>
              <Tag label={motor.mfgID} />
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default MotorList
