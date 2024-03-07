import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/ui/table'
import { fetchMyRockets } from '@/app/lib/neo4j'

export default async function MyRockets (): Promise<React.JSX.Element> {
  const rockets = await fetchMyRockets()

  if (rockets === null) {
    return <div>Failed to load rockets</div>
  }
  return (
    <Table
      striped
      className='[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]min-w-full font-mono border-b border-gray-900/10 pb-6'
    >
      <TableHead>
        <TableRow>
          <TableHeader className='text-2xl'>My Rockets</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {rockets.map((rocket) => (
          <TableRow
            key={rocket.id}
            href={`/dashboard/rockets/${rocket.id}`}
          >
            <TableCell>{rocket.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export async function MyRocketsSelect (): Promise<React.JSX.Element> {
  const rockets = await fetchMyRockets()

  if (rockets === null) {
    return <div>Failed to load rockets</div>
  }
  return (
    <select name='myrocket_id' className='w-full border-slate-400'>
      {rockets.map((rocket) => (
        <option key={rocket.id} value={rocket.id}>
          {rocket.name}
        </option>
      ))}
    </select>
  )
}
