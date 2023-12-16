import neo4j from 'neo4j-driver'

const uri = process.env.NEO4J_URI
const username = process.env.NEO4J_USERNAME
const password = process.env.NEO4J_PASSWORD

if (!uri || !username || !password) {
  throw new Error('Environment variables NEO4J_URI, NEO4J_USERNAME, or NEO4J_PASSWORD are not set')
}

const driver = neo4j.driver(uri, neo4j.auth.basic(username, password))

// Generic function to execute Neo4j queries
async function executeQuery (query, params = {}, mapper = record => record) {
  const session = driver.session()
  try {
    const res = await session.executeRead(tx => tx.run(query, params))
    return res.records.map(mapper)
  } catch (error) {
    console.error('Neo4j query error:', error)
    throw error // Rethrowing the error to be handled by the caller
  } finally {
    await session.close()
  }
}

// Mapper for Kit
const mapKit = record => {
  const node = record.get('k').properties
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
}

export async function getKits (): Promise<Kit[]> {
  const query = 'MATCH (k:Kit) RETURN k'
  return await executeQuery(query, {}, mapKit)
}

export async function getKit (id: string): Promise<Kit | null> {
  const query = 'MATCH (k:Kit {UniqueID: $id}) RETURN k'
  const records = await executeQuery(query, { id }, mapKit)
  return records.length > 0 ? records[0] : null
}

// Mapper for Motor
const mapMotor = record => {
  const node = record.get('n').properties
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
}

export async function getMotors (): Promise<Motor[]> {
  const query = 'MATCH (n:Motor) RETURN n'
  return await executeQuery(query, {}, mapMotor)
}

export async function getMotor (id: string): Promise<Motor | null> {
  const query = 'MATCH (n:Motor {motorId: $id}) RETURN n'
  const records = await executeQuery(query, { id }, mapMotor)
  return records.length > 0 ? records[0] : null
}

// ... (Other functions and mappers for Manufacturer and other types)
