import React from 'react'
import TopNav from '@/app/ui/TopNav'
import MotorDetails from '@/app/ui/motors/motor-details'
import { getMotors, getMotor } from '@/app/lib/neo4j'

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
    title: motor.madeBy.name + ' ' + motor.designation
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
        links={[
          { href: '/refdata', label: 'data' },
          { href: '/refdata/motors', label: 'motors' }
        ]}
        page={{ title: motor.designation }}
      />
      <MotorDetails motor={motor} />
    </div>
  )
}
