import neo4j from 'neo4j-driver'
import { cache } from 'react'
import { getUser } from '@/app/lib/kinde'

const uri = process.env.NEO4J_URI
const username = process.env.NEO4J_USERNAME
const password = process.env.NEO4J_PASSWORD

if (uri == null || username == null || password == null) {
  throw new Error(
    'Environment variables NEO4J_URI, NEO4J_USERNAME, or NEO4J_PASSWORD are not set'
  )
}

const driver = neo4j.driver(uri, neo4j.auth.basic(username, password))

export async function fetchMyRockets (): Promise<Rocket[] | null> {
  // Open a new session
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
      return null // Return null if no kit found
    }

    // Map the query results to the Rocket array
    const rockets = res.records.map((record) => {
      // Extract node properties
      const node = record.get('r').properties

      // Convert node properties to Motor type
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
