import Profile from '@/app/ui/dashboard/profile'
// import ConfigView from '@/app/ui/rocket/config-details'
import { fetchConfigMotors, fetchDesign } from '@/app/lib/neo4j'
import Breadcrumbs from '@/app/ui/bread-crumbs'

export default async function Page ({
  params
}: {
  params: {
    rocket_id: string
    design_id: string
    config_id: string
  }
}): Promise<React.JSX.Element> {
  const id = params.design_id
  const configId = params.config_id

  const design: Design | null = await fetchDesign(id)

  const config = design?.supports?.find((c) => {
    return c.id === configId
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
      <div className='flex justify-between items-start'>
        <div className='px-4 sm:px-0'>
          <h3 className='text-base font-semibold leading-7 text-gray-900'>
            {config.name}
          </h3>
          <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
            <Breadcrumbs
              breadcrumbs={[
                {
                  label: `${design.defines.name}`,
                  href: `/dashboard/rockets/${design.defines.id}`
                },
                {
                  label: `${config.name}`,
                  href: `/dashboard/rockets/${design.defines.id}/designs/${design.id}`
                }
              ]}
            />
          </p>
        </div>
      </div>
      {/* <ConfigView
        config={config}
        rocketId={params.rocket_id}
        designId={params.design_id}
      /> */}
    </main>
  )
}
