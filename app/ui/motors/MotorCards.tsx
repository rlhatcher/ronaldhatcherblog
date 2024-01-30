import React from 'react'
import { getMotors } from '@/app/lib/neo4j'
import MotorList from './MotorList'

export default async function MotorCards ({
  limit
}: {
  limit?: number
}): Promise<React.JSX.Element | never[]> {
  const motors: Motor[] = await getMotors()
  if (motors == null) return []

  return <MotorList motors={motors} />
}
