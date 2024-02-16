import { getFlightCards } from '@/app/lib/neo4j'

export default async function FlightCards (): Promise<React.JSX.Element> {
  const flightCards = await getFlightCards()
  return (
    <div>
      <h1>Flight Cards</h1>
      <ul>
        {flightCards.map((card) => (
          <li key={card.rocket}>{card.rocket}</li>
        ))}
      </ul>
    </div>
  )
}
