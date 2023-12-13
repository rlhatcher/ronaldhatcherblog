import neo4j from 'neo4j-driver'

const uri = process.env.NEO4J_URI
const username = process.env.NEO4J_USERNAME
const password = process.env.NEO4J_PASSWORD

if (uri == null || username == null || password == null) {
  throw new Error(
    'Environment variables NEO4J_URI, NEO4J_USERNAME, or NEO4J_PASSWORD are not set'
  )
}

const driver = neo4j.driver(uri, neo4j.auth.basic(username, password))

export async function getMfgs (): Promise<string[]> {
  // Open a new session
  const session = driver.session()

  const manufacturers: string[] = []

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
      MATCH (n:Manufacturer) RETURN n
  `,
        {}
      )
    )

    const values = res.records.map((record) => record.toObject())
    manufacturers.push(...values.map((value) => value.n.properties.name))
  } catch {
    // Handle any errors
  } finally {
    // Close the session
    await session.close()
  }

  return manufacturers
}

export async function getMotors (): Promise<Motor[]> {
  // Open a new session
  const session = driver.session()

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (n:Motor) RETURN n
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
          MATCH (n:Motor {motorId: $id}) RETURN n
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
        MATCH (k:Kit) RETURN k
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

export async function getKit (id: string): Promise<Kit | null> {
  // Open a new session
  const session = driver.session()

  try {
    const res = await session.executeRead((tx) =>
      tx.run(
        `
        MATCH (k:Kit {model: $id}) RETURN k
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
