import {
  type Neo4jNode,
  executeRead,
  executeWrite,
  safeParseJSON,
} from '../neo4j'

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
    MATCH (d:Design {id: $designId})<-[:DEFINED_BY]-(r:Rocket)
    OPTIONAL MATCH (d)-[:SUPPORTS]->(c:Configuration)
    OPTIONAL MATCH (s:Simulation)<-[:VALIDATED_BY]-(c)
    OPTIONAL MATCH (c)-[:USES_MOTOR]->(m:Motor)
    OPTIONAL MATCH (m)<-[:MAKES]-(mf:Manufacturer)
    RETURN d AS design, 
           r AS rocket,
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
  const rocketNode: Neo4jNode<Rocket> = record.get('rocket')

  const design: Design = {
    ...designNode.properties,
    defines: rocketNode.properties,
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
      simulationData: safeParseJSON(
        simNode.properties.simulationData as string
      ),
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
  const params = {
    designId: design.id,
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
