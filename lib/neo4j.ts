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

export async function getKits (): Promise<Kit[]> {
  // Open a new session
  const session = driver.session()

  try {
    const res = await session.executeRead(tx =>
      tx.run(`
        MATCH (k:Kit) RETURN k
      `, {})
    )

    // Check if the result contains records
    if (res.records.length === 0) {
      return []
    }

    // Map the query results to the Kit array
    const kits = res.records.map(record => {
      const node = record.get('k').properties

      // Convert node properties to Kit type
      return {
        mfg_id: node.mfg_id,
        model: node.model,
        name: node.name,
        image: node.image,
        recommended_engines: node.recommended_engines,
        projected_max_altitude: node.projected_max_altitude,
        recovery_system: node.recovery_system,
        length: node.length,
        diameter: node.diameter,
        estimated_weight: node.estimated_weight,
        estimated_assembly_time: node.estimated_assembly_time,
        fin_materials: node.fin_materials,
        decal_type: node.decal_type,
        launch_system: node.launch_system,
        launch_rod_size: node.launch_rod_size,
        age_recommendation: node.age_recommendation,
        description: node.description,
        instructions: node.instructions,
        src_url: node.src_url,
        is_discontinued: node.is_discontinued
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
    const res = await session.executeRead(tx =>
      tx.run(`
        MATCH (k:Kit {model: $id}) RETURN k
      `, { id })
    )

    if (res.records.length === 0) {
      return null // Return null if no kit found
    }

    // Extract the single kit record
    const record = res.records[0]
    const node = record.get('k').properties

    // Convert node properties to Kit type
    return {
      mfg_id: node.mfg_id,
      model: node.model,
      name: node.name,
      image: node.image,
      recommended_engines: node.recommended_engines,
      projected_max_altitude: node.projected_max_altitude,
      recovery_system: node.recovery_system,
      length: node.length,
      diameter: node.diameter,
      estimated_weight: node.estimated_weight,
      estimated_assembly_time: node.estimated_assembly_time,
      fin_materials: node.fin_materials,
      decal_type: node.decal_type,
      launch_system: node.launch_system,
      launch_rod_size: node.launch_rod_size,
      age_recommendation: node.age_recommendation,
      description: node.description,
      instructions: node.instructions,
      src_url: node.src_url,
      is_discontinued: node.is_discontinued
    }
  } catch (error) {
    console.error(error)
    return null
  } finally {
    // Close the session
    await session.close()
  }
}
