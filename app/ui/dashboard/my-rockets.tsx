import { fetchMyRockets } from '@/app/lib/neo4j'

export default async function MyRockets (): Promise<React.JSX.Element> {
  const rockets = await fetchMyRockets()

  if (rockets === null) {
    return <div>Failed to load rockets</div>
  }
  return (
    <div>
      <h1>My Rockets</h1>
      <ul>
        {rockets.map((rocket) => (
          <li key={rocket.slug}>{rocket.name}</li>
        ))}
      </ul>
    </div>
  )
}
