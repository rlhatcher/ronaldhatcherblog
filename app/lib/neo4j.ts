import neo4j, { type Integer } from 'neo4j-driver'
import { cache } from 'react'
import { getUser } from '@/app/lib/kinde'
// import { unstable_noStore as noStore } from 'next/cache'

const uri = process.env.NEO4J_URI
const username = process.env.NEO4J_USERNAME
const password = process.env.NEO4J_PASSWORD

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

/**
 * Fetches a rocket from the database based on its ID.
 * @param id The ID of the rocket to fetch.
 * @returns A Promise that resolves to the fetched rocket, or null if the rocket is not found.
 */
export async function fetchRocket (id: string): Promise<Rocket | null> {
  const session = driver.session()

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (r:Model:Rocket {slug: $id})
        RETURN r
        `,
        { id }
      )
    )

    if (res.records.length === 0) {
      return null
    }

    const rockets = res.records.map((record) => {
      const node = record.get('r').properties

      return {
        name: node.name,
        slug: node.slug
      }
    })

    return rockets[0]
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
        RETURN r
        `,
        { id: user.id }
      )
    )

    if (res.records.length === 0) {
      return null
    }

    const rockets = res.records.map((record) => {
      const node = record.get('r').properties

      return {
        name: node.name,
        slug: node.slug
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
        MERGE (r:Rocket:Model {slug: $slug})
        ON CREATE SET r.name = $name
        ON MATCH SET r.name = $name 
        WITH r
        MATCH (p:Person {id: $id})
        MERGE (p)-[:OWNS]->(r)
        RETURN r
      `,
        {
          slug: rocket.slug,
          name: rocket.name,
          id: user.id
        }
      )
    )

    if (res.records.length === 0) {
      return null
    }

    const record = res.records[0]
    const node = record.get('r').properties

    return {
      name: node.name,
      slug: node.slug
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
        MATCH (r:Rocket:Model {slug: $slug, name: $name})
        DETACH DELETE r
        RETURN count(r) AS deletedCount
      `,
        {
          slug: rocket.slug,
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

export const getManufacturers = cache(async (): Promise<Manufacturer[]> => {
  const mfgs = await getDbManufacturers()
  return mfgs
})

export async function getDbManufacturers (): Promise<Manufacturer[]> {
  // Open a new session
  const session = driver.session()

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (n:Manufacturer)
        WHERE n.mfgID IS NOT NULL
        RETURN n;
  `,
        {}
      )
    )
    // Check if the result contains records
    if (res.records.length === 0) {
      return []
    }
    const manufacturers = res.records.map((record) => {
      const node = record.get('n').properties
      return {
        name: node.name,
        mfgID: node.mfgID
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

export const getMfgMakes = cache(async (id: string): Promise<Manufacturer> => {
  const mfgs = await getDbMfgMakes(id)
  return mfgs
})

export async function getDbMfgMakes (id: string): Promise<Manufacturer> {
  // Open a new session
  const session = driver.session()

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (m:Manufacturer {mfgID: $id})-[:MAKES]->(product)
        WHERE m.mfgID IS NOT NULL
        RETURN m AS manufacturer, collect(product) AS products
        `,
        { id }
      )
    )
    if (res.records.length === 0) {
      return { name: '', mfgID: '' }
    }
    const record = res.records[0]
    const manufacturerNode = record.get('manufacturer').properties

    const kits: Kit[] = []
    const motors: Motor[] = []
    // Add more arrays for other types if needed

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
            mfgID: product.mfgID,
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
            uniqueID: product.uniqueID
          })
          break
        case 'Motor':
          motors.push(product)
          break
        // Add more cases for other types
      }
    })

    return {
      name: manufacturerNode.name,
      mfgID: manufacturerNode.mfgID,
      kits,
      motors
      // Add more arrays for other types
    }
  } catch (error) {
    // Handle any errors
    console.error(error)
    return { name: '', mfgID: '' }
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
        MATCH (n:Motor)
        WHERE n.motorId IS NOT NULL
        RETURN n
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
      const node = record.get('n').properties

      // Convert node properties to Motor type
      return {
        commonName: node.commonName,
        delays: node.delays,
        diameter: node.diameter,
        infoUrl: node.infoUrl,
        totImpulseNs: node.totImpulseNs,
        manufacturer: node.manufacturer,
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
        mfgID: node.mfgID
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
          MATCH (n:Motor {motorId: $id})
          WHERE n.motorId IS NOT NULL
          RETURN n
        `,
        { id }
      )
    )

    if (res.records.length === 0) {
      return null // Return null if no motor found
    }

    // Extract the single motor record
    const record = res.records[0]
    const node = record.get('n').properties

    // Convert node properties to Motor type
    return {
      commonName: node.commonName,
      delays: node.delays,
      diameter: node.diameter,
      infoUrl: node.infoUrl,
      totImpulseNs: node.totImpulseNs,
      manufacturer: node.manufacturer,
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
      mfgID: node.mfgID
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
        MATCH (k:Kit)
        WHERE k.uniqueID IS NOT NULL
        RETURN k
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

      // Convert node properties to Kit type
      return {
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
        mfgID: node.mfgID,
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
        uniqueID: node.uniqueID
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
        MATCH (k:Kit {UniqueID: $id})
        WHERE k.uniqueID IS NOT NULL
        RETURN k
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

    // Convert node properties to Kit type
    return {
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
      mfgID: node.mfgID,
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
      uniqueID: node.uniqueID
    }
  } catch (error) {
    console.error(error)
    return null
  } finally {
    // Close the session
    await session.close()
  }
}
