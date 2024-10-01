import React from 'react'

import { BreadcrumbResponsive } from '@/components/bread-crumb'
import MotorDetails from '@/components/motors/motor-details'
import { readMotor, fetchMotor } from '@/lib/neo4j'

export const revalidate = 10

interface MotorProps {
  params: {
    id: string
  }
}

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  const motors = await readMotor()

  if (motors == null) return []

  return motors.map(motor => ({
    id: motor.motorId,
  }))
}

export async function generateMetadata({
  params: { id },
}: MotorProps): Promise<{ title: string }> {
  const motor = await fetchMotor(id)

  if (motor == null) {
    return {
      title: 'Motor Not Found',
    }
  }

  return {
    title: motor.madeBy.name + ' ' + motor.designation,
  }
}

export default async function MotorPage({
  params: { id },
}: MotorProps): Promise<React.JSX.Element> {
  const motor = await fetchMotor(id)

  if (motor == null) {
    return <div></div>
  }

  const links: BreadCrumb[] = [
    { href: '/', label: 'Home' },
    { href: '/refdata', label: 'Reference' },
    { href: '/refdata/motors', label: 'Motors' },
    { label: motor.commonName ?? 'Motor' },
  ]

  return (
    <div className="container mx-auto px-1 sm:px-2 lg:px-4">
      <BreadcrumbResponsive items={links} />
      <MotorDetails motor={motor} />
    </div>
  )
}
