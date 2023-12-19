import React from 'react'
import TopNav from '@/app/components/TopNav'

import { getMotors, getMotor } from '@/lib/neo4j'
import Link from 'next/link'

export const revalidate = 10

interface Props {
  params: {
    id: string
  }
}

export async function generateStaticParams (): Promise<Array<{ id: string }>> {
  const motors = await getMotors()

  if (motors == null) return []

  return motors.map((motor) => ({
    id: motor.motorId
  }))
}

export async function generateMetadata ({
  params: { id }
}: Props): Promise<{ title: string }> {
  const motor = await getMotor(id)

  if (motor == null) {
    return {
      title: 'Post Not Found'
    }
  }

  return {
    title: motor.manufacturer + ' ' + motor.designation
  }
}

export default async function MotorPage ({
  params: { id }
}: Props): Promise<React.JSX.Element> {
  const motor = await getMotor(id)

  if (motor == null) {
    return <div></div>
  }

  return (
    <div className='container mx-auto sm:px-8 lg:px-10'>
      <TopNav
        links={[{ href: '/data/motors', label: 'Motors' }]}
        page={{ title: motor.designation }}
      />
      <Link
        href={`/data/manufacturers/${motor.manufacturer}`}
        key={motor.manufacturer}
        className='bg-gray-300 shadow-sm font-mono rounded-md p-2'
      >
        {' '}
        {motor.manufacturer}{' '}
      </Link>
      <div className='border-t border-gray-100'>
        <dl className='divide-y divide-gray-100 mx-auto'>
          {Object.entries(motor).map(([key, value]) => (
            <div
              key={key}
              className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'
            >
              <dt className='text-sm font-medium text-gray-900'>
                {key.replace(/([A-Z])/g, ' $1')}
              </dt>
              <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
                {value == null ? 'undefined' : value.toString()}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
