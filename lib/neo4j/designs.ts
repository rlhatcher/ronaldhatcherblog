'use server'

import {
  type Neo4jNode,
  executeRead,
  executeWrite,
  safeParseJSON,
} from '../neo4j'

import {
  type Design,
  type RocketPart,
  type Configuration,
  type Simulation,
} from '@/schemas/designs'
import { type Motor } from '@/schemas/motors'
import { type ParentReference } from '@/schemas/references'

export async function fetchDesign(designId: string): Promise<Design | null> {
  const design = await getDesign(designId)
  if (design == null) return null

  const parent: ParentReference = { id: design.id, name: design.name }

  const consistsOf = await fetchRocketParts(designId)
  const supports = await fetchConfigurations(designId)
  const basedOnDesigns = await fetchBasedOnDesigns(parent)

  return {
    ...design,
    consistsOf: consistsOf ?? [],
    supports: supports ?? [],
    basedOn: basedOnDesigns ?? [],
  }
}

/**
 * Get a Design node by designId.
 */
export async function getDesign(designId: string): Promise<Design | null> {
  const res = await executeRead(
    `
    MATCH (d:Design {id: $designId})
    RETURN d
    `,
    { designId }
  )

  if (res === null || res.records.length === 0) return null

  const record = res.records[0]
  const designNode: Neo4jNode<Design> = record.get('d')

  const design: Design = {
    ...designNode.properties,
  }
  return design
}

/**
 * Fetch all RocketParts related to a design.
 */
export async function fetchRocketParts(
  designId: string
): Promise<RocketPart[]> {
  const res = await executeRead(
    `
    MATCH (d:Design {id: $id})-[:CONSISTS_OF]->(p:RocketPart)
    OPTIONAL MATCH (p)-[:COMPOSED_OF*]->(subPart:RocketPart)
    RETURN p, COLLECT(subPart) AS composedParts
    `,
    { designId }
  )

  if (res === null || res.records.length === 0) return []

  const rocketParts: RocketPart[] = res.records.map(record => {
    const node = record.get('p').properties
    const composedParts = record
      .get('composedParts')
      .map((subPart: RocketPart) => ({
        ...subPart,
      }))

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
  return rocketParts
}

/**
 * Fetch all Configurations related to a design, including their simulations and motors.
 */
export async function fetchConfigurations(
  designId: string
): Promise<Configuration[]> {
  const res = await executeRead(
    `
    MATCH (d:Design {id: $id})-[:SUPPORTS]->(c:Configuration)
    OPTIONAL MATCH (c)-[:VALIDATED_BY]->(s:Simulation)
    OPTIONAL MATCH (c)-[:USES_MOTOR]->(m:Motor)
    OPTIONAL MATCH (m)-[:MADE_BY]->(mfg:Manufacturer)
    RETURN c, COLLECT(s) AS simulations, COLLECT(m { .*, madeBy: { id: mfg.id, name: mfg.name } }) AS motors
  `,
    { id: designId }
  )

  if (res === null || res.records.length === 0) {
    return []
  }

  const configs: Configuration[] = res.records.map(record => {
    const node = record.get('c').properties
    const simulationNodes = record.get('simulations').properties

    const simulations: Simulation[] = simulationNodes.map((simNode: any) => ({
      ...simNode.properties,
      validates: node.properties,
      simulationData: safeParseJSON(
        simNode.properties.simulationData as string
      ),
    }))
    return configs
  }
    // const motors: Motor[] = record
    //   .get('motors')
    //   .map((motorNode: Node) => motorNode.properties)

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
 * Merges a Design node and its related Configuration and Simulation nodes.
 *
 * The Design object is merged with the associated Rocket object, Configuration objects, and Simulation objects.
 * The Design object is connected to the Rocket object with a DEFINED_BY relationship.
 * The Design object is connected to the Configuration objects with a SUPPORTS relationship.
 * The Configuration objects are connected to the Simulation objects with a VALIDATED_BY relationship.
 * The Configuration objects are connected to the Motor objects with a USES_MOTOR relationship.
 * The Motor objects are connected to the Manufacturer objects with a MAKES relationship.
 *
 * @param design - The Design object to be merged.
 * @returns A Promise that resolves to void when the merge operation is complete.
 */

export async function mergeDesignOld(design: Design): Promise<void> {
  const params = {
    designId: design.name,
    name: design.name,
    filename: design.reflectedIn ?? null,
    stages: design.stages ?? null,
    massEmpty: design.massEmpty ?? null,
    stabilityCal: design.stabilityCal ?? null,
    stabilityPct: design.stabilityPct ?? null,
    cg: design.cg ?? null,
    cp: design.cp ?? null,
    totalLength: design.totalLength ?? null,
    maxDiameter: design.maxDiameter ?? null,
    supports: design.supports,
  }

  const query = `
    MERGE (design:Design {id: $designId})
    ON CREATE SET design += {
      name: $name, reflectedIn: $filename, stages: $stages,
      massEmpty: $massEmpty, stabilityCal: $stabilityCal, stabilityPct: $stabilityPct,
      cg: $cg, cp: $cp, totalLength: $totalLength, maxDiameter: $maxDiameter
    }
    
    WITH design
    UNWIND $supports AS cfg
    MERGE (configuration:Configuration {id: cfg.id})
    ON CREATE SET configuration += {
      name: cfg.name, stageNumber: cfg.stageNumber, stageActive: cfg.stageActive,
      delay: cfg.delay, ignitionEvent: cfg.ignitionEvent, ignitionDelay: cfg.ignitionDelay
    }
    MERGE (design)-[:SUPPORTS]->(configuration)

    WITH configuration, cfg
    MATCH (motor:Motor {designation: cfg.designation})
    MERGE (configuration)-[:USES_MOTOR]->(motor)

    WITH configuration, cfg.simulations AS sims
    UNWIND sims AS sim
    MERGE (simulation:Simulation {name: sim.name})
    ON CREATE SET simulation += {
      simulator: sim.simulator, calculator: sim.calculator,
      maxaltitude: sim.maxaltitude, maxvelocity: sim.maxvelocity,
      maxacceleration: sim.maxacceleration, maxmach: sim.maxmach,
      timetoapogee: sim.timetoapogee, flighttime: sim.flighttime,
      groundhitvelocity: sim.groundhitvelocity, launchrodvelocity: sim.launchrodvelocity,
      deploymentvelocity: sim.deploymentvelocity, optimumdelay: sim.optimumdelay, simulationData: sim.simulationData
    }
    MERGE (configuration)-[:VALIDATED_BY]->(simulation)
  `

  await executeWrite(query, params)
  console.log('Design, configurations, and simulations merged successfully')
}

/**
 * Merge the Design node and its components into the database.
 * @param design - The design object to merge.
 */
export async function mergeDesign(design: Design): Promise<void> {
  const parentReference: ParentReference = { id: design.id, name: design.name };

  await mergeDesignNode(design);
  await mergeRocketParts(design.consistsOf ?? []);
  await mergeConfigurations(design.supports ?? [], parentReference);  // Pass parentReference
  await mergeBasedOnDesigns(design.basedOn);
}

/**
 * Merge the core Design node.
 */
async function mergeDesignNode(design: Design): Promise<void> {
  const query = `
    MERGE (d:Design {id: $id})
    ON CREATE SET d.name = $name, d.totalLength = $totalLength, d.maxDiameter = $maxDiameter
    ON MATCH SET d.stages = $stages
  `;
  await executeWrite(query, {
    id: design.id,
    name: design.name,
    totalLength: design.totalLength,
    maxDiameter: design.maxDiameter,
    stages: design.stages,
  });
}

/**
 * Merge RocketParts related to the design.
 */
async function mergeRocketParts(rocketParts: RocketPart[]): Promise<void> {
  const query = `
    UNWIND $rocketParts AS part
    MERGE (p:RocketPart {id: part.id})
    ON CREATE SET p.name = part.name, p.mass = part.mass, p.length = part.length, p.diameter = part.diameter
  `;
  await executeWrite(query, { rocketParts });
}

/**
 * Merge Configurations, along with related Motors and Simulations.
 */
async function mergeConfigurations(
  configurations: Configuration[],
  parentReference: ParentReference  // Include parentReference
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
  `;
  await executeWrite(query, { configurations, parentReference });
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
  `;
  await executeWrite(query, { basedOn });
}