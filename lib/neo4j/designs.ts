'use server'

import {
  type Neo4jNode,
  executeRead,
  executeWrite,
  safeParseJSON,
} from '../neo4j'

import { type Manufacturer } from '@/schemas/core'
import {
  type RocketPart,
  type Configuration,
  type Design,
  type Simulation,
} from '@/schemas/Design'
import { type Motor } from '@/schemas/Motors'

/**
 * Fetches a design from the database based on the provided design ID.
 *
 * The design is fetched along with its associated rocket, configurations, and simulations.
 *
 * @param designId - The ID of the design to fetch.
 * @returns A Promise that resolves to the fetched Design object, or null if the design is not found.
 */
export async function fetchDesign(designId: string): Promise<Design | null> {
  const res = await executeRead(
    `
    MATCH (d:Design {id: $designId})
    OPTIONAL MATCH (d)-[:SUPPORTS]->(c:Configuration)
    OPTIONAL MATCH (s:Simulation)<-[:VALIDATED_BY]-(c)
    OPTIONAL MATCH (c)-[:USES_MOTOR]->(m:Motor)
    OPTIONAL MATCH (m)<-[:MAKES]-(mf:Manufacturer)
    RETURN d AS design, 
           c AS configuration,
           COLLECT(s) AS simulationsForConfig,
           COLLECT(m) AS motorsForConfig,
           COLLECT(DISTINCT {motor: m, manufacturer: mf}) AS motorsWithManufacturers 
    `,
    { designId }
  )

  if (res === null || res.records.length === 0) {
    return null
  }

  const record = res.records[0]
  const designNode: Neo4jNode<Design> = record.get('design')

  const design: Design = {
    ...designNode.properties,
    supports: [],
  }

  const configurationsWithSimulations = res.records.flatMap(record => {
    const configNode = record.get('configuration')
    if (configNode === null || configNode === undefined) return []

    const simulationsNodes = record.get('simulationsForConfig')
    if (simulationsNodes === null || simulationsNodes === undefined) return []

    const simulations = simulationsNodes.map((simNode: any) => ({
      ...simNode.properties,
      validates: configNode.properties,
      produces: safeParseJSON(simNode.properties.produces as string),
    }))

    const motorsWithManufacturers: Array<{
      motor: Neo4jNode<Motor>
      manufacturer: Neo4jNode<Manufacturer>
    }> = record.get('motorsWithManufacturers')

    const configuration: Configuration = {
      ...configNode.properties,
      validatedBy: simulations,
      usesMotor: motorsWithManufacturers
        .filter(mwm => mwm.motor !== null)
        .map(({ motor, manufacturer }) => ({
          ...motor.properties,
          madeBy: manufacturer != null ? manufacturer.properties : null,
        })),
      appliesTo: design,
    }

    return [configuration]
  })

  design.supports = configurationsWithSimulations

  return design
}

/**
 * We need to flatten the RocketPart objects into a single array of nodes and relationships
 * to avoid recursion when merging the Design object.
 */
interface Relationship {
  from: string
  to: string
  type: string
}

function preprocessRocketParts(parts: RocketPart[]): {
  nodes: RocketPart[]
  relationships: Relationship[]
  topLevelPartIds: string[]
} {
  const nodes: RocketPart[] = []
  const relationships: Relationship[] = []
  const topLevelPartIds: string[] = []

  function processPart(part: RocketPart, parentId?: string): void {
    // Only process parts with an id
    if (part.id == null) return

    nodes.push(part)

    if (parentId != null) {
      relationships.push({ from: parentId, to: part.id, type: 'COMPOSED_OF' })
    } else {
      topLevelPartIds.push(part.id)
    }

    if (part.composedOf != null) {
      part.composedOf.forEach(subpart => {
        processPart(subpart, part.id)
      })
    }
  }

  parts.forEach(part => {
    processPart(part)
  })
  return { nodes, relationships, topLevelPartIds }
}

function preprocessConfigurations(supports: Configuration[]): {
  simulations: Simulation[]
  simRelationships: Relationship[]
  motors: Motor[]
  motorRelationships: Relationship[]
} {
  const simulations: Simulation[] = []
  const simRelationships: Relationship[] = []
  const motors: Motor[] = []
  const motorRelationships: Relationship[] = []

  supports.forEach(cfg => {
    cfg.validatedBy?.forEach(sim => {
      const completeSim: Simulation = {
        ...sim,
        simulator: sim.simulator ?? undefined,
        calculator: sim.calculator ?? undefined,
        maxaltitude: sim.maxaltitude ?? undefined,
        maxvelocity: sim.maxvelocity ?? undefined,
        maxacceleration: sim.maxacceleration ?? undefined,
        maxmach: sim.maxmach ?? undefined,
        timetoapogee: sim.timetoapogee ?? undefined,
        flighttime: sim.flighttime ?? undefined,
        groundhitvelocity: sim.groundhitvelocity ?? undefined,
        launchrodvelocity: sim.launchrodvelocity ?? undefined,
        deploymentvelocity: sim.deploymentvelocity ?? undefined,
        optimumdelay: sim.optimumdelay ?? undefined,
        produces: sim.produces ?? undefined,
      }
      simulations.push(completeSim)
      simRelationships.push({ from: cfg.id, to: sim.id, type: 'VALIDATED_BY' })
    })

    cfg.usesMotor?.forEach(motor => {
      motors.push(motor)
      motorRelationships.push({
        from: cfg.id,
        to: motor.motorId,
        type: 'USES_MOTOR',
      })
    })
  })

  return { simulations, simRelationships, motors, motorRelationships }
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
export async function mergeDesign(design: Design): Promise<void> {
  // Flatten parts and configurations
  const { nodes, relationships, topLevelPartIds } = preprocessRocketParts(
    design.consistsOf ?? []
  )
  const { simulations, simRelationships, motors, motorRelationships } =
    preprocessConfigurations(design.supports ?? [])

  const params = {
    designId: design.name,
    name: design.name,
    totalLength: design.totalLength ?? null,
    maxDiameter: design.maxDiameter ?? null,
    supports: design.supports ?? [],
    nodes,
    relationships,
    topLevelPartIds,
    simulations,
    simRelationships,
    motors,
    motorRelationships,
  }

  const query = `
    // Merge the Design node
    MERGE (design:Design {id: $designId})
    ON CREATE SET design.name = $name, design.totalLength = $totalLength, design.maxDiameter = $maxDiameter

    // Handle Configuration nodes
    WITH design
    UNWIND $supports AS cfg
    MERGE (configuration:Configuration {id: cfg.id})
    ON CREATE SET configuration.name = cfg.name, configuration.stageNumber = cfg.stageNumber,
                  configuration.stageActive = cfg.stageActive, configuration.delay = cfg.delay,
                  configuration.ignitionEvent = cfg.ignitionEvent, configuration.ignitionDelay = cfg.ignitionDelay
    MERGE (design)-[:SUPPORTS]->(configuration)

    // Merge all RocketPart nodes
    WITH design
    UNWIND $nodes AS part
    MERGE (rocketPart:RocketPart {id: part.id})
    ON CREATE SET rocketPart.name = part.name, rocketPart.mass = part.mass, rocketPart.length = part.length,
                  rocketPart.diameter = part.diameter, rocketPart.material = part.material

    // Create CONSISTS_OF relationships from Design to top-level RocketParts
    WITH design
    UNWIND $topLevelPartIds AS partId
    MATCH (rocketPart:RocketPart {id: partId})
    MERGE (design)-[:CONSISTS_OF]->(rocketPart)

    // Create COMPOSED_OF relationships for nested RocketParts
    WITH design
    UNWIND $relationships AS rel
    MATCH (parent:RocketPart {id: rel.from})
    MATCH (child:RocketPart {id: rel.to})
    MERGE (parent)-[:COMPOSED_OF]->(child)
    
    // Merge all Simulation nodes
    WITH design
    UNWIND $simulations AS sim
    MERGE (simulation:Simulation {id: sim.id})
    ON CREATE SET simulation.name = sim.name, simulation.simulator = sim.simulator, simulation.calculator = sim.calculator,
                  simulation.maxaltitude = sim.maxaltitude, simulation.maxvelocity = sim.maxvelocity,
                  simulation.maxacceleration = sim.maxacceleration, simulation.maxmach = sim.maxmach,
                  simulation.timetoapogee = sim.timetoapogee, simulation.flighttime = sim.flighttime,
                  simulation.groundhitvelocity = sim.groundhitvelocity, simulation.launchrodvelocity = sim.launchrodvelocity,
                  simulation.deploymentvelocity = sim.deploymentvelocity, simulation.optimumdelay = sim.optimumdelay

    // Create VALIDATED_BY relationships for Simulations
    WITH design
    UNWIND $simRelationships AS simRel
    MATCH (cfg:Configuration {id: simRel.from})
    MATCH (sim:Simulation {id: simRel.to})
    MERGE (cfg)-[:VALIDATED_BY]->(sim)

    // Merge all Motor nodes
    WITH design
    UNWIND $motors AS motor
    MERGE (motorNode:Motor {id: motor.id})
    ON CREATE SET motorNode.name = motor.name, motorNode.designation = motor.designation
    // Add other motor properties as needed

    // Create USES_MOTOR relationships for Motors
    WITH design
    UNWIND $motorRelationships AS motorRel
    MATCH (cfg:Configuration {id: motorRel.from})
    MATCH (motor:Motor {id: motorRel.to})
    MERGE (cfg)-[:USES_MOTOR]->(motor)

    RETURN design
  `

  await executeWrite(query, params)
  console.log('Design, configurations, and rocket parts merged successfully')
}
