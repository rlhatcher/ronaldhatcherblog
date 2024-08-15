import { executeRead, executeWrite } from '../neo4j'

import { rocketSchema, type Rocket } from '@/schemas/Rocket'

/**
 * Retrieves all rockets
 * @returns A promise that resolves to an array of Rocket objects.
 */
export async function getRockets(): Promise<Rocket[]> {
  const res = await executeRead(
    `
    MATCH (r:Rocket)
    WHERE r.rocketId IS NOT NULL
    OPTIONAL MATCH (r)-[:BASED_ON]->(relatedRocket:Rocket)
    RETURN r, collect(relatedRocket) AS basedOnRockets
    `,
    {}
  )

  if (res === null || res.records.length === 0) {
    return []
  }

  const rockets = res.records.map(record => {
    const node = record.get('r').properties
    const basedOnNodes = record.get('basedOnRockets')

    return {
      ...node,
      basedOn: basedOnNodes.map((relatedRocketNode: any) => ({
        ...relatedRocketNode.properties,
        basedOn: [],
      })),
    }
  })

  const validatedRockets = rockets
    .map(rocket => {
      const parsedRocket = rocketSchema.safeParse(rocket)
      if (!parsedRocket.success) {
        console.error('Validation failed for rocket:', parsedRocket.error)
        return null
      }
      return parsedRocket.data
    })
    .filter((rocket): rocket is Rocket => rocket !== null)

  return validatedRockets
}

/**
 * Merges a rocket into the database.
 * @param rocket The rocket object to be merged.
 * @returns A promise that resolves to the merged Rocket object.
 */
export async function mergeRocket(rocket: Rocket): Promise<Rocket> {
  const parsedRocket = rocketSchema.safeParse(rocket)

  if (!parsedRocket.success) {
    throw new Error(`Validation failed: ${parsedRocket.error.message}`)
  }

  const res = await executeWrite(
    `
    MERGE (r:Rocket {rocketId: $rocketId})
    ON CREATE SET r.name = $name, r.description = $description, r.image = $image
    ON MATCH SET r.name = $name, r.description = $description, r.image = $image
    RETURN r
    `,
    {
      rocketId: parsedRocket.data.id,
      name: parsedRocket.data.name,
      description: parsedRocket.data.description,
      image: parsedRocket.data.image,
    }
  )

  if (res === null || res.records.length === 0) {
    throw new Error('Failed to merge rocket')
  }

  const node = res.records[0].get('r').properties

  const validatedRocket = rocketSchema.safeParse(node)
  if (!validatedRocket.success) {
    throw new Error(
      `Validation failed for returned rocket: ${validatedRocket.error.message}`
    )
  }

  return validatedRocket.data
}
