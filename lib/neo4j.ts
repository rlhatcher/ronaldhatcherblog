import neo4j, {
  type QueryResult,
  type Driver,
  type RecordShape,
} from 'neo4j-driver'

export interface Neo4jNode<T> {
  properties: T
}

/**
 * Safely parses a JSON string and returns the parsed value.
 * If parsing fails, it returns a default value.
 *
 * @param jsonString - The JSON string to parse.
 * @param defaultValue - The default value to return if parsing fails. Defaults to an empty array.
 * @returns The parsed JSON value or the default value if parsing fails.
 */
export const safeParseJSON = (
  jsonString: string,
  defaultValue: any = []
): any => {
  try {
    if (jsonString === '') {
      return defaultValue
    }
    return JSON.parse(jsonString)
  } catch (error) {
    return defaultValue
  }
}

const uri = process.env.NEO4J_URI
const username = process.env.NEO4J_USERNAME
const password = process.env.NEO4J_PASSWORD

if (uri == null || username == null || password == null) {
  throw new Error(
    'Environment variables NEO4J_URI, NEO4J_USERNAME, or NEO4J_PASSWORD are not set'
  )
}

export const driver: Driver = neo4j.driver(
  uri,
  neo4j.auth.basic(username, password)
)

export async function executeWrite(
  query: string,
  parameters?: any
): Promise<QueryResult<RecordShape> | null> {
  const session = driver.session()

  try {
    const result = await session.executeWrite(tx => tx.run(query, parameters))
    return result
  } finally {
    await session.close()
  }
}

export async function executeRead(
  query: string,
  parameters?: any
): Promise<QueryResult<RecordShape> | null> {
  const session = driver.session()

  try {
    const result = await session.executeRead(tx => tx.run(query, parameters))
    return result
  } finally {
    await session.close()
  }
}

export * from './neo4j/motors'
export * from './neo4j/designs'
export * from './neo4j/rockets'
