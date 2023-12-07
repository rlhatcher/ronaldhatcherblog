import React from 'react'
import Link from 'next/link'
import { getMotors } from '@/lib/neo4j'

export default async function MotorCards ({
  limit
}: {
  limit?: number
}): Promise<React.JSX.Element | never[]> {
  const motors: Motor[] = await getMotors()
  if (motors == null) return []

  return (
    <div className='mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8  lg:max-w-none lg:grid-cols-3'>
      {motors.map((motor) => {
        return (
          <Link href={`/data/motors/${motor.id}`} key={motor.id} className='bg-gray-300 shadow-sm font-mono rounded-md p-2'>
            {motor.manufacturer} {motor.designation}
          </Link>
        )
      })}
    </div>
  )
}
