import neo4j, { type Session, type Record, type Integer } from 'neo4j-driver'
import { cache } from 'react'
import { getUser } from '@/app/lib/kinde'

const uri = process.env.NEO4J_URI
const username = process.env.NEO4J_USERNAME
const password = process.env.NEO4J_PASSWORD

// Defining a generic interface for Neo4j nodes to improve type safety
interface Neo4jNode<T> {
  properties: T
}

if (uri == null || username == null || password == null) {
  throw new Error(
    'Environment variables NEO4J_URI, NEO4J_USERNAME, or NEO4J_PASSWORD are not set'
  )
}

const driver = neo4j.driver(uri, neo4j.auth.basic(username, password))

// const ITEMS_PER_PAGE = 6
// export async function fetchFilteredKits (
//   query: string,
//   currentPage: number
// ): Promise<Kit[]> {
//   noStore()
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE

//   try {
//     const invoices = await sql<InvoicesTable>`
//       SELECT
//         invoices.id,
//         invoices.amount,
//         invoices.date,
//         invoices.status,
//         customers.name,
//         customers.email,
//         customers.image_url
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       WHERE
//         customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`} OR
//         invoices.amount::text ILIKE ${`%${query}%`} OR
//         invoices.date::text ILIKE ${`%${query}%`} OR
//         invoices.status ILIKE ${`%${query}%`}
//       ORDER BY invoices.date DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `

//     return invoices.rows
//   } catch (error) {
//     console.error('Database Error:', error)
//     throw new Error('Failed to fetch invoices.')
//   }
// }

export const getFlightCards = cache(async (): Promise<FlightCard[]> => {
  const cards = await getDbFlightCards()
  return cards
})

export async function getDbFlightCards (): Promise<any[]> {
  // Open a new session
  const session = driver.session()

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
      MATCH (fc:FlightCard)-[r]->(endNode)
      RETURN 
        fc.id AS id, 
        collect(endNode) AS relatedInfo`,
        {}
      )
    )

    if (res.records.length === 0) {
      return []
    }

    const flightCards = res.records.map((record) => {
      const id = record.get('id')
      const relatedInfo = record.get('relatedInfo')
      // Initialize an object to consolidate properties

      const card: FlightCard = { id }

      card.id = id
      relatedInfo.forEach((Node: { labels: any[], properties: any }) => {
        const type = Node.labels[0]
        switch (type) {
          case 'Configuration':
            card.motor = Node.properties.name
            break
          case 'ModelRocket':
            card.rocket = Node.properties.name
            break
          case 'Flight':
            card.altitude = Node.properties.altitude
        }
      })

      return card
    })

    return flightCards
  } catch (error) {
    // Handle any errors
    console.error(error)
    return []
  } finally {
    // Close the session
    await session.close()
  }
}
export const mrgPerson = cache(
  async (person: Person): Promise<Person | null> => {
    const dbPerson = await mrgDbPerson(person)
    return dbPerson
  }
)

/**
 *  ____            _        _
 * |  _ \ ___   ___| | _____| |_
 * | |_) / _ \ / __| |/ / _ \ __|
 * |  _ < (_) | (__|   <  __/ |_
 * |_| \_\___/ \___|_|\_\___|\__|
 */

// Helper function to map generic node properties to Kit or Rocket
function mapNodeToType (node: any, labels: string[]): Kit | Rocket {
  if (labels.includes('Kit')) {
    return {
      madeBy: {
        id: node.id,
        name: node.name
      },
      url: node.url,
      imageSrc: node.imageSrc,
      recommendedEngines: node.recommendedEngines,
      projectedMaxAltitude: node.projectedMaxAltitude,
      recoverySystem: node.recoverySystem,
      length: node.length,
      diameter: node.diameter,
      estimatedWeight: node.estimatedWeight,
      estimatedAssemblyTime: node.estimatedAssemblyTime,
      finMaterials: node.finMaterials,
      decalType: node.decalType,
      launchSystem: node.launchSystem,
      launchRodSize: node.launchRodSize,
      instructions: node.instructions,
      ageRecommendation: node.ageRecommendation,
      name: node.name,
      complexity: node.complexity,
      height: node.height,
      weight: node.weight,
      motorMount: node.motorMount,
      parachuteSize: node.parachuteSize,
      shockCordType: node.shockCordType,
      shockCordMount: node.shockCordMount,
      finThickness: node.finThickness,
      ringThickness: node.ringThickness,
      price: node.price,
      currency: node.currency,
      sku: node.sku,
      stockStatus: node.stockStatus,
      description: node.description,
      links: node.links,
      parachute: node.parachute,
      finArray: node.finArray,
      id: node.id,
      labels
    } satisfies Kit
  }
  return {
    id: node.id,
    name: node.name,
    description: node.description,
    image: node.image,
    isModel: labels.includes('Model')
  } satisfies Rocket
}

/**
 * Fetches a rocket from the database based on its ID.
 *
 * @param id - The ID of the rocket to fetch.
 * @returns A Promise that resolves to the fetched rocket, or null if the rocket is not found.
 */
export async function fetchRocket (id: string): Promise<Rocket | null> {
  const session: Session = driver.session()
  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (r:Rocket {id: $id})
        OPTIONAL MATCH (r)-[:DEFINED_BY]->(d:Design)
        OPTIONAL MATCH (r)-[:BASED_ON]->(b)
        OPTIONAL MATCH (i)-[:BASED_ON]->(r)
        WITH r, d, b, i, LABELS(b) AS basedOnLabels, LABELS(i) AS inspiredLabels
        RETURN r, 
          LABELS(r) AS labels,
          collect(DISTINCT d) AS designs,
          collect(DISTINCT {node: b, labels: basedOnLabels}) AS basedOn,
          collect(DISTINCT {node: i, labels: inspiredLabels}) AS inspired
        `,
        { id }
      )
    )

    if (res.records.length === 0) {
      return null
    }

    const record: Record = res.records[0]
    const rocketNode: Neo4jNode<Rocket> = record.get('r')

    const basedOn: Array<Kit | Rocket> = record
      .get('basedOn')
      .filter(
        (obj: any): obj is { node: any, labels: string[] } => obj.node !== null
      )
      .map((obj: { node: any, labels: string[] }) => {
        return mapNodeToType(obj.node.properties, obj.labels)
      })

    const inspired: Rocket[] = record
      .get('inspired')
      .filter((i: any): i is { node: any, labels: string[] } => i.node !== null)
      .map((i: { node: any, labels: string[] }) => {
        return mapNodeToType(i.node.properties, i.labels)
      })

    const labels: string[] = record.get('labels')

    const rocket: Partial<Rocket> = {
      isModel: labels.includes('Model'),
      id: rocketNode.properties.id,
      name: rocketNode.properties.name,
      description: rocketNode.properties.description,
      image: rocketNode.properties.image,
      basedOn,
      inspired,
      labels
    }

    const definedBy: Design[] = record
      .get('designs')
      .filter(
        (d: Neo4jNode<Design> | null): d is Neo4jNode<Design> => d !== null
      )
      .map((d: Neo4jNode<Design>) => {
        const design = d.properties
        design.defines = rocket as Rocket // Here we cast rocket as Rocket because it will be a full Rocket after all properties are set.
        return design
      })

    rocket.definedBy = definedBy

    return rocket as Rocket
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await session.close()
  }
}

/**
 * Fetches the rockets associated with the current user.
 * @returns A promise that resolves to an array of Rocket objects, or null if no rockets are found.
 */
export async function fetchMyRockets (): Promise<Rocket[] | null> {
  const session = driver.session()
  const user = await getUser()

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (:Person {id: $id})-[]->(r:Rocket)
        RETURN r, LABELS(r) AS labels
        `,
        { id: user.id }
      )
    )

    if (res.records.length === 0) {
      return null
    }

    const rockets = res.records.map((record) => {
      const node = record.get('r').properties
      const labels: string[] = record.get('labels')
      return {
        isModel: labels.includes('Model'),
        name: node.name,
        id: node.id
      }
    })

    return rockets
  } catch (error) {
    console.error(error)
    return null
  } finally {
    // Close the session
    await session.close()
  }
}

/**
 * Merges a Rocket node in the Neo4j database and establishes a relationship between the rocket and the current user.
 * If the rocket node does not exist, it will be created.
 *
 * @param rocket - The Rocket object to be merged.
 * @returns A Promise that resolves to the merged Rocket object, or null if an error occurs.
 */
export async function mergeRocket (rocket: Rocket): Promise<Rocket | null> {
  const session = driver.session()
  const user = await getUser()

  try {
    const res = await session.executeWrite((tx) =>
      tx.run(
        `
        MERGE (r:Rocket:Model {id: $rocketId})
        ON CREATE SET r.name = $name, r.image = $image, r.description = $description
        ON MATCH SET r.name = $name, r.image = $image, r.description = $description 
        WITH r
        MATCH (p:Person {id: $userId})
        MERGE (p)-[:OWNS]->(r)
        RETURN r, LABELS(r) AS labels
      `,
        {
          rocketId: rocket.id,
          name: rocket.name,
          userId: user.id,
          description: rocket.description,
          image: rocket.image
        }
      )
    )

    if (res.records.length === 0) {
      return null
    }

    const record = res.records[0]
    const node = record.get('r').properties
    const labels: string[] = record.get('labels')

    return {
      isModel: labels.includes('Model'),
      name: node.name,
      id: node.id
    }
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await session.close()
  }
}

/**
 * Removes a rocket from the Neo4j database.
 *
 * @param rocket - The rocket object to be removed.
 * @returns A promise that resolves to the number of rockets deleted, or null if no rockets were deleted.
 */
export async function removeRocket (rocket: Rocket): Promise<Integer | null> {
  const session = driver.session()

  try {
    const res = await session.executeWrite((tx) =>
      tx.run(
        `
        MATCH (r:Rocket:Model {id: $id, name: $name})
        DETACH DELETE r
        RETURN count(r) AS deletedCount
      `,
        {
          id: rocket.id,
          name: rocket.name
        }
      )
    )

    if (
      res.records.length === 0 ||
      res.records[0].get('deletedCount').toInt() === 0
    ) {
      // No nodes were deleted
      return null
    } else {
      // Nodes were deleted
      return res.records[0].get('deletedCount').toInt()
    }
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await session.close()
  }
}

/**
 *  ____
 * |  _ \ ___ _ __ ___  ___  _ __
 * | |_) / _ \ '__/ __|/ _ \| '_ \
 * |  __/  __/ |  \__ \ (_) | | | |
 * |_|   \___|_|  |___/\___/|_| |_|
 */

export async function mrgDbPerson (person: Person): Promise<Person | null> {
  // Open a new session
  const session = driver.session()

  try {
    const res = await session.executeWrite((tx) =>
      tx.run(
        `
        MERGE (p:Person {id: $id})
        ON CREATE SET p.email = $email,
                      p.family_name = $family_name,
                      p.given_name = $given_name,
                      p.picture = $picture
        RETURN p
      `,
        {
          id: person.id,
          email: person.email,
          family_name: person.family_name,
          given_name: person.given_name,
          picture: person.picture
        }
      )
    )

    if (res.records.length === 0) {
      return null // Return null if no person found
    }

    // Extract the single person record
    const record = res.records[0]
    const node = record.get('p').properties

    // Convert node properties to Person type
    return {
      id: node.id,
      email: node.email,
      family_name: node.family_name,
      given_name: node.given_name,
      picture: node.picture
    }
  } catch (error) {
    // Handle any errors
    console.error(error)
    return null // Return null in case of an error
  } finally {
    // Close the session
    await session.close()
  }
}

/**
 *  ____            _
 * |  _ \  ___  ___(_) __ _ _ __  ___
 * | | | |/ _ \/ __| |/ _` | '_ \/ __|
 * | |_| |  __/\__ \ | (_| | | | \__ \
 * |____/ \___||___/_|\__, |_| |_|___/
 *                    |___/
 */

// Adjusting fetchDesign function using the Neo4jNode<T> interface for type safety
export async function fetchDesign (designId: string): Promise<Design | null> {
  const session: Session = driver.session()
  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (d:Design {id: $designId})<-[:DEFINED_BY]-(r:Rocket)
        OPTIONAL MATCH (d)-[:SUPPORTS]->(c:Configuration)
        OPTIONAL MATCH (c)-[:VALIDATED_BY]->(s:Simulation)
        RETURN d AS design, 
               r AS rocket,
               COLLECT(DISTINCT c) AS supports,
               COLLECT(DISTINCT s) AS validatedBy
        `,
        { designId }
      )
    )

    if (res.records.length === 0) {
      return null
    }

    const record = res.records[0]
    const designNodeProperties = record.get('design').properties
    const rocketNodeProperties = record.get('rocket').properties

    // Using the Neo4jNode<T> interface to improve type safety
    const configurationsNodes: Array<Neo4jNode<Configuration>> = record.get('supports')
      .filter((cfg: Neo4jNode<Configuration> | null): cfg is Neo4jNode<Configuration> => cfg !== null)
    const simulationsNodes: Array<Neo4jNode<Simulation>> = record.get('validatedBy')
      .filter((sim: Neo4jNode<Simulation> | null): sim is Neo4jNode<Simulation> => sim !== null)

    const supports = configurationsNodes.map(cfgNode => {
      const cfgProperties = cfgNode.properties // Direct access to properties thanks to typing
      const cfgSimulations = simulationsNodes
        .filter(simNode => simNode.properties.validates === cfgProperties.id)
        .map(simNode => simNode.properties) // Direct access to properties thanks to typing

      return {
        ...cfgProperties,
        validatedBy: cfgSimulations
      }
    })

    const design: Design = {
      ...designNodeProperties,
      defines: {
        ...rocketNodeProperties
      },
      supports
    }

    return design
  } catch (error) {
    console.error('Failed to fetch design:', error)
    return null
  } finally {
    await session.close()
  }
}

export async function mergeDesign (design: Design): Promise<void> {
  const session = driver.session()

  const params = {
    designId: design.id,
    name: design.name,
    rocketId: design.defines.id ?? null,
    filename: design.reflectedIn ?? null,
    stages: design.stages ?? null,
    massEmpty: design.massEmpty ?? null,
    stabilityCal: design.stabilityCal ?? null,
    stabilityPct: design.stabilityPct ?? null,
    cg: design.cg ?? null,
    cp: design.cp ?? null,
    totalLength: design.totalLength ?? null,
    maxDiameter: design.maxDiameter ?? null,
    supports: design.supports
  }

  /**
   * The query below merges a Design node and its related Configuration and Simulation nodes.
   * Connect the design with the associated rocket/model
   * Create the design
   * Connect the design with the associated configurations
   * Create the configurations
   * Connect the configurations with the associated simulations
   * Create the simulations
   */
  const query = `
    MERGE (design:Design {id: $designId})
    ON CREATE SET design += {
      name: $name, reflectedIn: $filename, stages: $stages,
      massEmpty: $massEmpty, stabilityCal: $stabilityCal, stabilityPct: $stabilityPct,
      cg: $cg, cp: $cp, totalLength: $totalLength, maxDiameter: $maxDiameter
    }
    WITH design
    MATCH (rocket:Rocket:Model {id: $rocketId})
    MERGE (rocket)-[:DEFINED_BY]->(design)
    
    WITH design
    UNWIND $supports AS cfg
    MERGE (configuration:Configuration {id: cfg.id})
    ON CREATE SET configuration += {
      name: cfg.name, stageNumber: cfg.stageNumber, stageActive: cfg.stageActive,
      delay: cfg.delay, ignitionEvent: cfg.ignitionEvent, ignitionDelay: cfg.ignitionDelay
    }
    MERGE (design)-[:SUPPORTS]->(configuration)

    WITH configuration, cfg.simulations AS sims
    UNWIND sims AS sim
    MERGE (simulation:Simulation {name: sim.name})
    ON CREATE SET simulation += {
      simulator: sim.simulator, calculator: sim.calculator,
      maxaltitude: sim.maxaltitude, maxvelocity: sim.maxvelocity,
      maxacceleration: sim.maxacceleration, maxmach: sim.maxmach,
      timetoapogee: sim.timetoapogee, flighttime: sim.flighttime,
      groundhitvelocity: sim.groundhitvelocity, launchrodvelocity: sim.launchrodvelocity,
      deploymentvelocity: sim.deploymentvelocity, optimumdelay: sim.optimumdelay
    }
    MERGE (configuration)-[:VALIDATED_BY]->(simulation)
  `

  try {
    await session.executeWrite(async (tx) => await tx.run(query, params))
    console.log('Design, configurations, and simulations merged successfully')
  } catch (error) {
    console.error(
      'Failed to merge design, configurations, and simulations:',
      error
    )
  } finally {
    await session.close()
  }
}

/**
 *  __  __                    __            _
 * |  \/  | __ _ _ __  _   _ / _| __ _  ___| |_ _   _ _ __ ___ _ __ ___
 * | |\/| |/ _` | '_ \| | | | |_ / _` |/ __| __| | | | '__/ _ \ '__/ __|
 * | |  | | (_| | | | | |_| |  _| (_| | (__| |_| |_| | | |  __/ |  \__ \
 * |_|  |_|\__,_|_| |_|\__,_|_|  \__,_|\___|\__|\__,_|_|  \___|_|  |___/
 */
export async function getManufacturers (): Promise<Manufacturer[]> {
  const session = driver.session()

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (n:Manufacturer)
        WHERE n.id IS NOT NULL
        RETURN n;
        `,
        {}
      )
    )
    if (res.records.length === 0) {
      return []
    }
    const manufacturers = res.records.map((record) => {
      const node = record.get('n').properties
      return {
        name: node.name,
        id: node.id
      }
    })
    return manufacturers
  } catch (error) {
    // Handle any errors
    console.error(error)
    return []
  } finally {
    // Close the session
    await session.close()
  }
}

export async function getManufacturer (id: string): Promise<Manufacturer> {
  const session = driver.session()

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (m:Manufacturer {id: $id})-[:MAKES]->(product)
        WHERE m.id IS NOT NULL
        RETURN m AS manufacturer, collect(product) AS products
        `,
        { id }
      )
    )
    if (res.records.length === 0) {
      return { name: '', id: '' }
    }
    const record = res.records[0]
    const manufacturerNode = record.get('manufacturer').properties

    const kits: Kit[] = []
    const motors: Motor[] = []

    const products = record.get('products')

    products.forEach((Node: { labels: any[], properties: any }) => {
      const type = Node.labels[0] // Assuming the first label is the type of the product
      const product = {
        type,
        ...Node.properties
      }

      switch (type) {
        case 'Kit':
          kits.push({
            madeBy: {
              id: manufacturerNode.id,
              name: manufacturerNode.name
            },
            url: product.url,
            imageSrc: product.image_src,
            recommendedEngines: product.recommendedEngines,
            projectedMaxAltitude: product.projectedMaxAltitude,
            recoverySystem: product.recoverySystem,
            length: product.length,
            diameter: product.diameter,
            estimatedWeight: product.estimatedWeight,
            estimatedAssemblyTime: product.estimatedAssemblyTime,
            finMaterials: product.finMaterials,
            decalType: product.decalType,
            launchSystem: product.launchSystem,
            launchRodSize: product.launchRodSize,
            instructions: product.instructions,
            ageRecommendation: product.ageRecommendation,
            name: product.name,
            complexity: product.complexity,
            height: product.height,
            weight: product.weight,
            motorMount: product.motorMount,
            parachuteSize: product.parachuteSize,
            shockCordType: product.shockCordType,
            shockCordMount: product.shockCordMount,
            finThickness: product.finThickness,
            ringThickness: product.ringThickness,
            price: product.price,
            currency: product.currency,
            sku: product.sku,
            stockStatus: product.stockStatus,
            description: product.description,
            links: product.links,
            parachute: product.parachute,
            finArray: product.finArray,
            id: product.id,
            labels: ['Kit']
          })
          break
        case 'Motor':
          motors.push({
            madeBy: {
              id: manufacturerNode.id,
              name: manufacturerNode.name
            },
            ...product
          })
          break
        // Add more cases for other types
      }
    })

    return {
      name: manufacturerNode.name,
      id: manufacturerNode.id,
      kits,
      motors
      // Add more arrays for other types
    }
  } catch (error) {
    // Handle any errors
    console.error(error)
    return { name: '', id: '' }
  } finally {
    // Close the session
    await session.close()
  }
}

export const getMotors = cache(async (): Promise<Motor[]> => {
  const motors = await getDbMotors()
  return motors
})

export async function getDbMotors (): Promise<Motor[]> {
  const session = driver.session()

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (mfg:Manufacturer)-[:MAKES]->(m:Motor)
        WHERE m.motorId IS NOT NULL
        RETURN m, mfg
      `,
        {}
      )
    )

    // Check if the result contains records
    if (res.records.length === 0) {
      return []
    }

    // Map the query results to the Motor array
    const motors = res.records.map((record) => {
      // Extract node properties
      const node = record.get('m').properties
      const mfgNode = record.get('mfg').properties

      // Convert node properties to Motor type
      return {
        madeBy: {
          id: mfgNode.id,
          name: mfgNode.name
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
        type: node.type
      }
    })

    return motors
  } catch (error) {
    // Handle any errors
    console.error(error)
    return []
  } finally {
    // Close the session
    await session.close()
  }
}

export const getMotor = cache(async (id: string): Promise<Motor | null> => {
  const motor = await getDbMotor(id)
  return motor
})

export async function getDbMotor (id: string): Promise<Motor | null> {
  // Open a new session
  const session = driver.session()

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
          MATCH (mfg:Manufacturer)-[:MAKES]->(m:Motor {motorId: $id})
          WHERE m.motorId IS NOT NULL
          RETURN mfg, m
        `,
        { id }
      )
    )

    if (res.records.length === 0) {
      return null // Return null if no motor found
    }

    // Extract the single motor record
    const record = res.records[0]
    const node = record.get('m').properties
    const mfgNode = record.get('mfg').properties

    // Convert node properties to Motor type
    return {
      madeBy: {
        id: mfgNode.id,
        name: mfgNode.name
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
      type: node.type
    }
  } catch (error) {
    // Handle any errors
    console.error(error)
    return null // Return null in case of an error
  } finally {
    // Close the session
    await session.close()
  }
}

export const getKits = cache(async (): Promise<Kit[]> => {
  const kits = await getDbKits()
  return kits
})

async function getDbKits (): Promise<Kit[]> {
  // Open a new session
  const session = driver.session()

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (m:Manufacturer)-[:MAKES]->(k:Kit)
        RETURN m, k
      `,
        {}
      )
    )

    // Check if the result contains records
    if (res.records.length === 0) {
      return []
    }

    // Map the query results to the Kit array
    const kits = res.records.map((record) => {
      const node = record.get('k').properties
      const mfgNode = record.get('m').properties

      // Convert node properties to Kit type
      return {
        madeBy: {
          id: mfgNode.id,
          name: mfgNode.name
        },
        url: node.url,
        imageSrc: node.image_src,
        recommendedEngines: node.recommendedEngines,
        projectedMaxAltitude: node.projectedMaxAltitude,
        recoverySystem: node.recoverySystem,
        length: node.length,
        diameter: node.diameter,
        estimatedWeight: node.estimatedWeight,
        estimatedAssemblyTime: node.estimatedAssemblyTime,
        finMaterials: node.finMaterials,
        decalType: node.decalType,
        launchSystem: node.launchSystem,
        launchRodSize: node.launchRodSize,
        instructions: node.instructions,
        ageRecommendation: node.ageRecommendation,
        name: node.name,
        complexity: node.complexity,
        height: node.height,
        weight: node.weight,
        motorMount: node.motorMount,
        parachuteSize: node.parachuteSize,
        shockCordType: node.shockCordType,
        shockCordMount: node.shockCordMount,
        finThickness: node.finThickness,
        ringThickness: node.ringThickness,
        price: node.price,
        currency: node.currency,
        sku: node.sku,
        stockStatus: node.stockStatus,
        description: node.description,
        links: node.links,
        parachute: node.parachute,
        finArray: node.finArray,
        id: node.id,
        labels: ['Kit']
      }
    })

    return kits
  } catch (error) {
    console.error(error)
    return []
  } finally {
    // Close the session
    await session.close()
  }
}

export const getKit = cache(async (id: string): Promise<Kit | null> => {
  const kit = await getDbKit(id)
  return kit
})

export async function getDbKit (id: string): Promise<Kit | null> {
  // Open a new session
  const session = driver.session()

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (k:Kit {id: $id}), (m:Manufacturer)-[:MAKES]->(k)
        RETURN m, k
      `,
        { id }
      )
    )

    if (res.records.length === 0) {
      return null // Return null if no kit found
    }

    // Extract the single kit record
    const record = res.records[0]
    const node = record.get('k').properties
    const mfgNode = record.get('m').properties

    // Convert node properties to Kit type
    return {
      madeBy: {
        id: mfgNode.id,
        name: mfgNode.name
      },
      id: node.id,
      url: node.url,
      imageSrc: node.image_src,
      recommendedEngines: node.recommendedEngines,
      projectedMaxAltitude: node.projectedMaxAltitude,
      recoverySystem: node.recoverySystem,
      length: node.length,
      diameter: node.diameter,
      estimatedWeight: node.estimatedWeight,
      estimatedAssemblyTime: node.estimatedAssemblyTime,
      finMaterials: node.finMaterials,
      decalType: node.decalType,
      launchSystem: node.launchSystem,
      launchRodSize: node.launchRodSize,
      instructions: node.instructions,
      ageRecommendation: node.ageRecommendation,
      name: node.name,
      complexity: node.complexity,
      height: node.height,
      weight: node.weight,
      motorMount: node.motorMount,
      parachuteSize: node.parachuteSize,
      shockCordType: node.shockCordType,
      shockCordMount: node.shockCordMount,
      finThickness: node.finThickness,
      ringThickness: node.ringThickness,
      price: node.price,
      currency: node.currency,
      sku: node.sku,
      stockStatus: node.stockStatus,
      description: node.description,
      links: node.links,
      parachute: node.parachute,
      finArray: node.finArray,
      labels: ['Kit']
    }
  } catch (error) {
    console.error(error)
    return null
  } finally {
    // Close the session
    await session.close()
  }
}
