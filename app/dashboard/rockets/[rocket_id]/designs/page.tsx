import Profile from '@/app/ui/dashboard/profile'
import DesignList from '@/app/ui/rocket/design-list'
import { fetchRocket } from '@/app/lib/neo4j'

export default async function Page ({
  params
}: {
  params: { rocket_id: string }
}): Promise<React.JSX.Element> {
  const rocketId = params.rocket_id
  const rocket = await fetchRocket(rocketId)

  if (rocket === null) {
    return <div>Failed to load rocket</div>
  }
  return (
    <main>
      <Profile />
      <DesignList listItems={rocket.definedBy} rocketId={rocketId} label='Designs' />
      {/* <div className='mt-6 flex items-center justify-end gap-x-6'>
      </div> */}
    </main>
  )
}
