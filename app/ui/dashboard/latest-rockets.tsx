import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/ui/table'
import { fetchMyRockets } from '@/app/lib/neo4j'

export default async function LatestRockets (): Promise<React.JSX.Element> {
  const rockets = await fetchMyRockets()

  if (rockets === null) {
    return <div>Failed to load rockets</div>
  }
  return (
    <Table
      striped
      className='[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)] font-mono'
    >
      <TableHead>
        <TableRow>
          <TableHeader className='text-2xl'>Latest Rockets</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {rockets.map((rocket) => (
          <TableRow key={rocket.id} href={`/dashboard/rockets/${rocket.id}`}>
            <TableCell>{rocket.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
