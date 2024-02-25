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
    <Table striped className='[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]'>
      <TableHead>
        <TableRow>
          <TableHeader>My Rockets</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {rockets.map((rocket) => (
          <TableRow
            key={rocket.slug}
            href={`/dashboard/rockets/${rocket.slug}`}
          >
            <TableCell className='font-medium'>{rocket.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
