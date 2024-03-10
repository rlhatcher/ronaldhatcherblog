import Profile from '@/app/ui/dashboard/profile'
import Form from '@/app/ui/rocket/edit-form'
import { fetchRocket } from '@/app/lib/neo4j'

export default async function Page ({
  params
}: {
  params: { rocket_id: string }
}): Promise<React.JSX.Element> {
  const id = params.rocket_id
  const rocket = await fetchRocket(id)

  if (rocket === null) {
    return <div>Failed to load rocket</div>
  }
  return (
    <main>
      <Profile />
      <Form rocket={rocket}/>
    </main>
  )
}
