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
    const res = await session.executeRead(tx =>
      tx.run(`
      MATCH (n:Manufacturer) RETURN n
  `, { })
    )

    const values = res.records.map(record => record.toObject())
    manufacturers.push(...values.map(value => value.n.properties.name))
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
    const res = await session.executeRead(tx =>
      tx.run(`
        MATCH (n:Motor) RETURN n
      `, {})
    )

    // Check if the result contains records
    if (res.records.length === 0) {
      return []
    }

    // Map the query results to the Motor array
    const motors = res.records.map(record => {
      // Extract node properties
      const node = record.get('n').properties

      // Convert node properties to Motor type
      return {
        id: node.id,
        manufacturer: node.manufacturer,
        manufacturerAbbrev: node.manufacturerAbbrev,
        designation: node.designation,
        commonName: node.commonName,
        impulseClass: node.impulseClass,
        diameter: node.diameter, // Assuming diameter is a Neo4j Integer
        length: node.length, // Assuming length is a Neo4j Integer
        type: node.type,
        certOrg: node.certOrg,
        avgThrustN: node.avgThrustN, // Convert Neo4j Integer to number
        maxThrustN: node.maxThrustN,
        totImpulseNs: node.totImpulseNs,
        burnTimeS: node.burnTimeS,
        dataFiles: node.dataFiles,
        infoUrl: node.infoUrl,
        totalWeightG: node.totalWeightG,
        propWeightG: node.propWeightG,
        delays: node.delays,
        propInfo: node.propInfo,
        sparky: node.sparky,
        updatedOn: new Date(node.updatedOn), // Convert string to Date
        caseInfo: node.caseInfo
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
    const res = await session.executeRead(tx =>
      tx.run(`
          MATCH (n:Motor {id: $id}) RETURN n
        `, { id })
    )

    if (res.records.length === 0) {
      return null // Return null if no motor found
    }

    // Extract the single motor record
    const record = res.records[0]
    const node = record.get('n').properties

    // Convert node properties to Motor type
    return {
      id: node.id,
      manufacturer: node.manufacturer,
      manufacturerAbbrev: node.manufacturerAbbrev,
      designation: node.designation,
      commonName: node.commonName,
      impulseClass: node.impulseClass,
      diameter: node.diameter, // Adjust conversion as needed
      length: node.length, // Adjust conversion as needed
      type: node.type,
      certOrg: node.certOrg,
      avgThrustN: node.avgThrustN, // Adjust conversion as needed
      maxThrustN: node.maxThrustN,
      totImpulseNs: node.totImpulseNs,
      burnTimeS: node.burnTimeS,
      dataFiles: node.dataFiles,
      infoUrl: node.infoUrl,
      totalWeightG: node.totalWeightG,
      propWeightG: node.propWeightG,
      delays: node.delays,
      propInfo: node.propInfo,
      sparky: node.sparky,
      updatedOn: new Date(node.updatedOn), // Convert string to Date
      caseInfo: node.caseInfo
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
