import neo4j from 'neo4j-driver'
import { cache } from 'react'

const uri = process.env.NEO4J_URI
const username = process.env.NEO4J_USERNAME
const password = process.env.NEO4J_PASSWORD

if (uri == null || username == null || password == null) {
  throw new Error(
    'Environment variables NEO4J_URI, NEO4J_USERNAME, or NEO4J_PASSWORD are not set'
  )
}

const driver = neo4j.driver(uri, neo4j.auth.basic(username, password))

export async function mrgPerson (person: Person): Promise<Person | null> {
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
  const mfgs = await getMfgs()
  return mfgs
})

export async function getMfgs (): Promise<Manufacturer[]> {
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

export async function getMfgMakes (id: string): Promise<Manufacturer | null> {
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
      return null // Return null if no manufacturer found
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
            recommendedEngines: product['Recommended Engines'],
            projectedMaxAltitude: product['Projected Max Altitude'],
            recoverySystem: product['Recovery System'],
            length: product.Length,
            diameter: product.Diameter,
            estimatedWeight: product['Estimated Weight'],
            estimatedAssemblyTime: product['Estimated Assembly Time'],
            finMaterials: product['Fin Materials'],
            decalType: product['Decal Type'],
            launchSystem: product['Launch System'],
            launchRodSize: product['Launch Rod Size'],
            instructions: product.instructions,
            ageRecommendation: product['Age Recommendation'],
            mfgID: product.mfgID,
            name: product.Name,
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
            uniqueID: product.UniqueID
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
    return null // Return null in case of an error
  } finally {
    // Close the session
    await session.close()
  }
}

export async function getMotors (): Promise<Motor[]> {
  // Open a new session
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

export async function getMotor (id: string): Promise<Motor | null> {
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

export async function getKits (): Promise<Kit[]> {
  // Open a new session
  const session = driver.session()

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (k:Kit)
        WHERE k.UniqueID IS NOT NULL
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
        recommendedEngines: node['Recommended Engines'],
        projectedMaxAltitude: node['Projected Max Altitude'],
        recoverySystem: node['Recovery System'],
        length: node.Length,
        diameter: node.Diameter,
        estimatedWeight: node['Estimated Weight'],
        estimatedAssemblyTime: node['Estimated Assembly Time'],
        finMaterials: node['Fin Materials'],
        decalType: node['Decal Type'],
        launchSystem: node['Launch System'],
        launchRodSize: node['Launch Rod Size'],
        instructions: node.instructions,
        ageRecommendation: node['Age Recommendation'],
        mfgID: node.mfgID,
        name: node.Name,
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
        uniqueID: node.UniqueID
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

export async function getKit (id: string): Promise<Kit | null> {
  // Open a new session
  const session = driver.session()

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (k:Kit {UniqueID: $id})
        WHERE k.UniqueID IS NOT NULL
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
      recommendedEngines: node['Recommended Engines'],
      projectedMaxAltitude: node['Projected Max Altitude'],
      recoverySystem: node['Recovery System'],
      length: node.Length,
      diameter: node.Diameter,
      estimatedWeight: node['Estimated Weight'],
      estimatedAssemblyTime: node['Estimated Assembly Time'],
      finMaterials: node['Fin Materials'],
      decalType: node['Decal Type'],
      launchSystem: node['Launch System'],
      launchRodSize: node['Launch Rod Size'],
      instructions: node.instructions,
      ageRecommendation: node['Age Recommendation'],
      mfgID: node.mfgID,
      name: node.Name,
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
      uniqueID: node.UniqueID
    }
  } catch (error) {
    console.error(error)
    return null
  } finally {
    // Close the session
    await session.close()
  }
}
