import { getManufacturers } from '@/app/lib/neo4j'

export default async function MfgSummary (): Promise<React.JSX.Element> {
  const manufacturers = await getManufacturers()
  return (
    <div>
      <h1>Manufacturers</h1>
      <ul>
        {manufacturers.map((mfg) => (
          <li key={mfg.mfgID}>{mfg.name}</li>
        ))}
      </ul>
    </div>
  )
}
