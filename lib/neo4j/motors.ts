import { executeRead, safeParseJSON } from '../neo4j'

import { type Motor } from '@/schemas/Motor'

/**
 * Fetches the motors from the graph without any relationships.
 * @returns A promise that resolves to an array of Motor objects.
 */
export async function fetchMotors(): Promise<Motor[]> {
  const res = await executeRead('MATCH (m:Motor) RETURN m')

  if (res === null || res.records.length === 0) {
    return []
  }

  const motors = res.records.map(record => {
    const node = record.get('m').properties
    return {
      ...node,
    }
  })
  return motors
}

/**
 * Retrieves a list of motors with their manufacturer information.
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

  const motors = res.records.map(record => {
    const node = record.get('m').properties
    const mfgNode = record.get('mfg').properties

    return {
      madeBy: {
        id: mfgNode.id,
        name: mfgNode.name,
      },
      commonName: node.commonName,
      delays: node.delays,
      diameter: node.diameter,
      infoUrl: node.infoUrl,
      totImpulseNs: node.totImpulseNs,
      burnTimeS: node.burnTimeS,
      propInfo: node.propInfo,
      length: node.length,
      avgThrustN: node.avgThrustN,
      dataFiles: node.dataFiles,
      impulseClass: node.impulseClass,
      sparky: node.sparky,
      caseInfo: node.caseInfo,
      propWeightG: node.propWeightG,
      certOrg: node.certOrg,
      motorId: node.motorId,
      availability: node.availability,
      maxThrustN: node.maxThrustN,
      totalWeightG: node.totalWeightG,
      designation: node.designation,
      updatedOn: node.updatedOn,
      type: node.type,
      thrustCurve: safeParseJSON(node.samples as string),
    }
  })

  return motors
}

/**
 * Retrieves a motor and its manufacturer from the graph based on its ID.
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
  const motorProps = record.get('m').properties
  const mfgProps = record.get('mfg').properties

  return {
    madeBy: {
      id: mfgProps.id,
      name: mfgProps.name,
    },
    ...motorProps,
    thrustCurve: safeParseJSON(motorProps.samples as string),
  }
}
