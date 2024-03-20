import Profile from '@/app/ui/dashboard/profile'
import ConfigView from '@/app/ui/rocket/config'
import { fetchConfigMotors, fetchDesign } from '@/app/lib/neo4j'

export default async function Page({
  params
}: {
  params: {
    design_id: string
    config_id: string
  }
}): Promise<React.JSX.Element> {
  const id = params.design_id
  const config_id = params.config_id

  const design: Design | null = await fetchDesign(id)

  const config = design?.supports?.find((c) => {
    return c.id === config_id
  })

  if (design === null || config === undefined) {
    return <div>Failed to load design</div>
  }

  const motors = await fetchConfigMotors(config.id)

  if (motors === null) {
    return <div>Failed to load motors</div>
  }
  
  config.usesMotor = motors

  return (
    <main>
      <Profile />
      <ConfigView config={config} />
      {/* <div className='mt-6 flex items-center justify-end gap-x-6'>
      </div> */}
    </main>
  )
}
