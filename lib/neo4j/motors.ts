import { executeRead, safeParseJSON } from '../neo4j'

import { type Motor } from '@/schemas/Motors'

/**
 * Retrieves all motors
 * @returns A promise that resolves to an array of Motor objects.
 */
export async function getMotors(): Promise<Motor[]> {
  const res = await executeRead(
    `
    MATCH (mfg:Manufacturer)-[:MAKES]->(m:Motor)
    WHERE m.motorId IS NOT NULL
    RETURN m, mfg
    `,
    {}
  )

  if (res === null || res.records.length === 0) {
    return []
  }

  const motors: Motor[] = res.records.map(record => {
    const node = record.get('m').properties
    const mfgNode = record.get('mfg').properties

    return {
      madeBy: {
        id: mfgNode.id,
        name: mfgNode.name,
      },
      ...node,
      thrustCurve: safeParseJSON(node.samples as string),
    }
  })

  return motors
}

/**
 * Retrieves a motor and its relations from the graph based on its ID.
 * @param id The ID of the motor to retrieve.
 * @returns A Promise that resolves to the retrieved motor, or null if the motor is not found.
 */
export async function getMotor(id: string): Promise<Motor | null> {
  const res = await executeRead(
    `
    MATCH (mfg:Manufacturer)-[:MAKES]->(m:Motor {motorId: $id})
    WHERE m.motorId IS NOT NULL
    RETURN mfg, m
    `,
    { id }
  )

  if (res === null || res.records.length === 0) {
    return null
  }

  const record = res.records[0]
  const node = record.get('m').properties
  const mfgNode = record.get('mfg').properties

  return {
    madeBy: {
      id: mfgNode.id,
      name: mfgNode.name,
    },
    ...node,
    thrustCurve: safeParseJSON(node.samples as string),
  }
}
