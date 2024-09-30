import { type Node, type Record } from 'neo4j-driver'

import { executeRead, executeWrite } from '../neo4j'

import {
  type Design,
  type RocketPart,
  type Configuration,
  type Simulation,
} from '@/schemas/Design'
import { type Motor } from '@/schemas/Motors'
import { type ParentReference } from '@/schemas/references'

/**
 * Fetch a design by ID.
 * @param designId - The ID of the design to fetch.
 * @returns A Design object or null if not found.
 */
export async function fetchDesign(designId: string): Promise<Design | null> {
  const design = await fetchDesignNode(designId)
  if (design == null) return null

  const parentReference: ParentReference = { id: design.id, name: design.name }

  const consistsOf = await fetchRocketParts(parentReference)
  const supports =
    await fetchConfigurationsWithSimulationsAndMotors(parentReference)
  const basedOnDesigns = await fetchBasedOnDesigns(parentReference)

  return {
    ...design,
    consistsOf: consistsOf ?? [],
    supports: supports ?? [],
    basedOn: basedOnDesigns ?? [],
  }
}

/**
 * Fetch the core Design node by designId.
 */
async function fetchDesignNode(designId: string): Promise<Design | null> {
  const query = `
    MATCH (d:Design {id: $designId})
    RETURN d
  `
  const res = await executeRead(query, { designId })

  if (res === null || res.records.length === 0) return null

  const node = res.records[0].get('d').properties

  // Aligning with the Design schema
  return {
    id: node.id,
    name: node.name,
    totalLength: node.totalLength,
    maxDiameter: node.maxDiameter,
    stages: node.stages,
    massEmpty: node.massEmpty,
    stabilityCal: node.stabilityCal,
    stabilityPct: node.stabilityPct,
    cg: node.cg,
    cp: node.cp,
    reflectedIn: {
      name: node.reflectedIn.name,
      url: node.reflectedIn.url,
    },
    supports: [], // To be filled later
    consistsOf: [], // To be filled later
    basedOn: [], // To be filled later
  }
}

/**
 * Fetch all RocketParts related to a design.
 */
async function fetchRocketParts(
  parentReference: ParentReference
): Promise<RocketPart[]> {
  const query = `
    MATCH (d:Design {id: $id})-[:CONSISTS_OF]->(p:RocketPart)
    OPTIONAL MATCH (p)-[:COMPOSED_OF*]->(subPart:RocketPart)
    RETURN p, COLLECT(subPart) AS composedParts
  `
  const res = await executeRead(query, { id: parentReference.id })
  if (res === null || res.records.length === 0) return []

  return res.records.map((record: Record) => {
    const node = record.get('p').properties
    const composedParts = record
      .get('composedParts')
      .map((subPart: Node) => subPart.properties)

    return {
      id: node.id,
      name: node.name,
      mass: node.mass,
      length: node.length,
      diameter: node.diameter,
      material: node.material,
      composedOf: composedParts,
    }
  })
}

/**
 * Fetch all Configurations related to a design, including their simulations and motors.
 */
export async function fetchConfigurationsWithSimulationsAndMotors(
  parentReference: ParentReference
): Promise<Configuration[]> {
  const query = `
    MATCH (d:Design {id: $id})-[:SUPPORTS]->(c:Configuration)
    OPTIONAL MATCH (c)-[:VALIDATED_BY]->(s:Simulation)
    OPTIONAL MATCH (c)-[:USES_MOTOR]->(m:Motor)
    OPTIONAL MATCH (m)-[:MADE_BY]->(mfg:Manufacturer)
    RETURN c, COLLECT(s) AS simulations, COLLECT(m { .*, madeBy: { id: mfg.id, name: mfg.name } }) AS motors
  `

  const res = await executeRead(query, { id: parentReference.id })
  if (res === null || res.records.length === 0) return []

  return res.records.map((record: Record) => {
    const node = record.get('c').properties

    const simulations: Simulation[] = record
      .get('simulations')
      .map((simNode: Node) => simNode.properties)
    const motors: Motor[] = record
      .get('motors')
      .map((motorNode: Node) => motorNode.properties)

    return {
      id: node.id,
      name: node.name,
      appliesTo: parentReference, // Using parentReference to populate appliesTo
      stageNumber: node.stageNumber,
      delay: node.delay,
      ignitionEvent: node.ignitionEvent,
      validatedBy: simulations,
      usesMotor: motors,
    }
  })
}

/**
 * Fetch all recursive BASED_ON relationships for the design.
 */
export async function fetchBasedOnDesigns(
  parentReference: ParentReference
): Promise<Design[]> {
  const query = `
    MATCH (d:Design {id: $id})-[:BASED_ON*]->(base:Design)
    RETURN base
  `

  const res = await executeRead(query, { id: parentReference.id })
  if (res === null || res.records.length === 0) return []

  return res.records.map((record: Record) => {
    const node = record.get('base').properties

    return {
      id: node.id,
      name: node.name,
      totalLength: node.totalLength,
      maxDiameter: node.maxDiameter,
      stages: node.stages,
      massEmpty: node.massEmpty,
      stabilityCal: node.stabilityCal,
      stabilityPct: node.stabilityPct,
      cg: node.cg,
      cp: node.cp,
      reflectedIn: {
        name: node.reflectedIn?.name ?? '', // Ensuring reflectedIn is aligned with the schema
        url: node.reflectedIn?.url ?? '',
      },
      supports: [], // To be populated later
      consistsOf: [], // To be populated later
      basedOn: [], // Avoid recursion
      appliesTo: parentReference, // Ensure we populate appliesTo with parentReference
    }
  })
}

/**
 * Merge the Design node and its components into the database.
 * @param design - The design object to merge.
 */
export async function mergeDesign(design: Design): Promise<void> {
  const parentReference: ParentReference = { id: design.id, name: design.name }

  await mergeDesignNode(design)
  await mergeRocketParts(design.consistsOf ?? [])
  await mergeConfigurationsWithMotorsAndSimulations(
    design.supports ?? [],
    parentReference
  )
  await mergeBasedOnDesigns(design.basedOn)
}

/**
 * Merge the core Design node.
 */
async function mergeDesignNode(design: Design): Promise<void> {
  const query = `
    MERGE (d:Design {id: $id})
    ON CREATE SET d.name = $name, d.totalLength = $totalLength, d.maxDiameter = $maxDiameter
    ON MATCH SET d.stages = $stages
  `
  await executeWrite(query, {
    id: design.id,
    name: design.name,
    totalLength: design.totalLength,
    maxDiameter: design.maxDiameter,
    stages: design.stages,
  })
}

/**
 * Merge RocketParts related to the design.
 */
async function mergeRocketParts(rocketParts: RocketPart[]): Promise<void> {
  const query = `
    UNWIND $rocketParts AS part
    MERGE (p:RocketPart {id: part.id})
    ON CREATE SET p.name = part.name, p.mass = part.mass, p.length = part.length, p.diameter = part.diameter
  `
  await executeWrite(query, { rocketParts })
}

/**
 * Merge Configurations, along with related Motors and Simulations.
 */
async function mergeConfigurationsWithMotorsAndSimulations(
  configurations: Configuration[],
  parentReference: ParentReference // Include parentReference
): Promise<void> {
  const query = `
    UNWIND $configurations AS cfg
    MERGE (c:Configuration {id: cfg.id})
    ON CREATE SET c.name = cfg.name, c.stageNumber = cfg.stageNumber, c.delay = cfg.delay
    WITH c, cfg
    UNWIND cfg.usesMotor AS motor
    MERGE (m:Motor {id: motor.id})
    MERGE (c)-[:USES_MOTOR]->(m)
    WITH c, cfg
    UNWIND cfg.validatedBy AS sim
    MERGE (s:Simulation {id: sim.id})
    MERGE (c)-[:VALIDATED_BY]->(s)
    SET c.appliesTo = $parentReference  // Set appliesTo using parentReference
  `
  await executeWrite(query, { configurations, parentReference })
}

/**
 * Merge the `basedOn` relationships for the design.
 */
async function mergeBasedOnDesigns(basedOn: Design[]): Promise<void> {
  const query = `
    UNWIND $basedOn AS base
    MERGE (d:Design {id: base.id})
    MERGE (b:Design {id: base.id})
    MERGE (d)-[:BASED_ON]->(b)
  `
  await executeWrite(query, { basedOn })
}
