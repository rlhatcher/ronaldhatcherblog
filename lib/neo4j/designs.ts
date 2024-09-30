import { executeRead, executeWrite } from '../neo4j'

import {
  type Design,
  type RocketPart,
  type Configuration,
  type Simulation,
} from '@/schemas/Design'
import { type Motor } from '@/schemas/Motors'

/**
 * Fetch a design by ID.
 * @param designId - The ID of the design to fetch.
 * @returns A promise that resolves to a Design object or null if not found.
 */
export async function fetchDesign(designId: string): Promise<Design | null> {
  const design = await fetchDesignNode(designId)
  if (design == null) return null

  const rocketParts = await fetchRocketParts(designId)
  const configurations = await fetchConfigurations(designId)
  const simulations = await fetchSimulations(designId)
  const motors = await fetchMotors(designId)
  const basedOnDesigns = await fetchBasedOnDesigns(designId)

  return {
    ...design,
    rocketParts,
    configurations,
    simulations,
    motors,
    basedOn: basedOnDesigns,
  }
}

/**
 * Merge the design into the database.
 * @param design - The design object to merge.
 */
export async function mergeDesign(design: Design): Promise<void> {
  // Run the merge queries in smaller functions
  await mergeDesignNode(design)
  await mergeOrkFile(design.orkFile, design.id) // Pass only the orkFile and designId
  await mergeRocketParts(design.rocketParts) // Pass only the rocket parts
  await mergeConfigurations(design.configurations, design.id) // Pass configurations and designId
  await mergeSimulations(design.simulations, design.id) // Pass simulations and designId
  await mergeMotors(design.motors, design.id) // Pass motors and designId
  await mergeBasedOnDesigns(design.basedOn, design.id) // Pass basedOn and designId
}

/**
 * Fetch the core Design node by ID.
 */
async function fetchDesignNode(designId: string): Promise<Design | null> {
  const query = `
    MATCH (d:Design {id: $designId})
    RETURN d AS design
  `

  const result = await executeRead(query, { designId })
  if (result === null || result.records.length === 0) return null

  const designNode = result.records[0].get('design')
  return designNode?.properties || null
}

/**
 * Fetch all RocketParts related to a design.
 */
async function fetchRocketParts(designId: string): Promise<RocketPart[]> {
  const query = `
    MATCH (d:Design {id: $designId})-[:CONSISTS_OF]->(p:RocketPart)
    OPTIONAL MATCH (p)-[:COMPOSED_OF*]->(subPart:RocketPart)
    RETURN p, COLLECT(subPart) AS composedParts
  `

  const result = await executeRead(query, { designId })
  return (
    result?.records.map(record => {
      const rocketPart = record.get('p').properties
      const composedParts = record
        .get('composedParts')
        .map((sub: any) => sub.properties)
      return {
        ...rocketPart,
        composedOf: composedParts,
      }
    }) || []
  )
}

/**
 * Fetch all Configurations related to a design.
 */
async function fetchConfigurations(designId: string): Promise<Configuration[]> {
  const query = `
    MATCH (d:Design {id: $designId})-[:SUPPORTS]->(c:Configuration)
    RETURN c
  `

  const result = await executeRead(query, { designId })
  return result?.records.map(record => record.get('c').properties) || []
}

/**
 * Fetch all Simulations related to a design's configurations.
 */
async function fetchSimulations(designId: string): Promise<Simulation[]> {
  const query = `
    MATCH (d:Design {id: $designId})-[:SUPPORTS]->(c:Configuration)-[:VALIDATED_BY]->(s:Simulation)
    OPTIONAL MATCH (s)-[:PRODUCES]->(sd:SimulationData)
    RETURN s, COLLECT(sd) AS simulationData
  `

  const result = await executeRead(query, { designId })
  return (
    result?.records.map(record => {
      const simulation = record.get('s').properties
      const simulationData = record
        .get('simulationData')
        .map((sd: any) => sd.properties)
      return {
        ...simulation,
        produces: simulationData,
      }
    }) || []
  )
}

/**
 * Fetch all Motors related to a design's configurations.
 */
async function fetchMotors(designId: string): Promise<Motor[]> {
  const query = `
    MATCH (d:Design {id: $designId})-[:SUPPORTS]->(c:Configuration)-[:USES_MOTOR]->(m:Motor)
    RETURN m
  `

  const result = await executeRead(query, { designId })
  return result?.records.map(record => record.get('m').properties) || []
}

/**
 * Fetch all recursive BASED_ON relationships for the design.
 */
async function fetchBasedOnDesigns(designId: string): Promise<Design[]> {
  const query = `
    MATCH (d:Design {id: $designId})-[:BASED_ON*]->(base:Design)
    RETURN base
  `

  const result = await executeRead(query, { designId })
  return result?.records.map(record => record.get('base').properties) || []
}

/**
 * Merge the core Design node into the database.
 */
async function mergeDesignNode(design: Design): Promise<void> {
  const query = `
    MERGE (d:Design {id: $design.id})
    ON CREATE SET d.name = $design.name,
                  d.totalLength = $design.totalLength,
                  d.maxDiameter = $design.maxDiameter
  `

  await executeWrite(query, { design })
}

/**
 * Merge the Ork File and BASED_ON relationships.
 * @param orkFile - The Ork File to merge.
 * @param designId - The ID of the design.
 */
async function mergeOrkFile(
  orkFile: OrkFile | undefined,
  designId: string
): Promise<void> {
  if (!orkFile) return // Skip if orkFile is undefined

  const query = `
    MERGE (ork:.OrkFile {url: $orkFile.url})
    MERGE (d:Design {id: $designId})-[:BASED_ON]->(ork)
  `

  await executeWrite(query, { orkFile, designId })
}

/**
 * Merge RocketParts and their recursive COMPOSED_OF relationships.
 * @param rocketParts - The list of rocket parts to merge.
 */
async function mergeRocketParts(rocketParts: RocketPart[]): Promise<void> {
  const query = `
    UNWIND $rocketParts AS part
    MERGE (p:RocketPart {id: part.id})
    ON CREATE SET p.name = part.name,
                  p.mass = part.mass,
                  p.length = part.length,
                  p.diameter = part.diameter,
                  p.material = part.material
    FOREACH (composedPart IN CASE WHEN part.composedOf IS NOT NULL THEN part.composedOf ELSE [] END |
      MERGE (subPart:RocketPart {id: composedPart.id})
      ON CREATE SET subPart.name = composedPart.name,
                    subPart.mass = composedPart.mass,
                    subPart.length = composedPart.length,
                    subPart.diameter = composedPart.diameter,
                    subPart.material = composedPart.material
      MERGE (p)-[:COMPOSED_OF]->(subPart)
    )
  `

  await executeWrite(query, { rocketParts })
}

/**
 * Merge Configurations for the Design.
 * @param configurations - The list of configurations to merge.
 * @param designId - The ID of the design.
 */
async function mergeConfigurations(
  configurations: Configuration[],
  designId: string
): Promise<void> {
  const query = `
    UNWIND $configurations AS cfg
    MERGE (c:Configuration {id: cfg.id})
    ON CREATE SET c.name = cfg.name,
                  c.stageNumber = cfg.stageNumber,
                  c.stageActive = cfg.stageActive
    MERGE (d:Design {id: $designId})-[:SUPPORTS]->(c)
  `

  await executeWrite(query, { configurations, designId })
}

/**
 * Merge Simulations and their corresponding SimulationData.
 * @param simulations - The list of simulations to merge.
 * @param designId - The ID of the design.
 */
async function mergeSimulations(
  simulations: Simulation[],
  designId: string
): Promise<void> {
  const query = `
    UNWIND $simulations AS sim
    MERGE (s:Simulation {id: sim.id})
    ON CREATE SET s.name = sim.name,
                  s.simulator = sim.simulator,
                  s.calculator = sim.calculator
    FOREACH (simData IN CASE WHEN sim.produces IS NOT NULL THEN sim.produces ELSE [] END |
      MERGE (sd:SimulationData {id: simData.id})
      ON CREATE SET sd.Time = simData.Time,
                    sd.Altitude = simData.Altitude
      MERGE (s)-[:PRODUCES]->(sd)
    )
    MERGE (d:Design {id: $designId})-[:VALIDATED_BY]->(s)
  `

  await executeWrite(query, { simulations, designId })
}

/**
 * Merge Motors related to the Design's configurations.
 * @param motors - The list of motors to merge.
 * @param designId - The ID of the design.
 */
async function mergeMotors(motors: Motor[], designId: string): Promise<void> {
  const query = `
    UNWIND $motors AS motor
    MERGE (m:Motor {id: motor.id})
    ON CREATE SET m.name = motor.commonName,
                  m.designation = motor.designation
    MERGE (d:Design {id: $designId})-[:USES_MOTOR]->(m)
  `

  await executeWrite(query, { motors, designId })
}

/**
 * Merge recursive BASED_ON relationships for Designs.
 * @param basedOnDesigns - The list of designs the current design is based on.
 * @param designId - The ID of the design.
 */
async function mergeBasedOnDesigns(
  basedOnDesigns: Design[],
  designId: string
): Promise<void> {
  const query = `
    FOREACH (baseDesign IN CASE WHEN $basedOnDesigns IS NOT NULL THEN $basedOnDesigns ELSE [] END |
      MERGE (parentDesign:Design {id: baseDesign.id})
      ON CREATE SET parentDesign.name = baseDesign.name,
                    parentDesign.totalLength = baseDesign.totalLength,
                    parentDesign.maxDiameter = baseDesign.maxDiameter
      MERGE (d:Design {id: $designId})-[:BASED_ON]->(parentDesign)
    )
  `

  await executeWrite(query, { basedOnDesigns, designId })
}
