import Profile from '@/app/ui/dashboard/profile'
import DesignView from '@/app/ui/rocket/design'
import { fetchDesign } from '@/app/lib/neo4j'
import Breadcrumbs from '@/app/ui/bread-crumbs'

export default async function Page ({
  params
}: {
  params: { rocket_id: string, design_id: string }
}): Promise<React.JSX.Element> {
  const designId = params.design_id
  const design = await fetchDesign(designId)

  if (design === null) {
    return <div>Failed to load design</div>
  }
  return (
    <main>
      <Profile />
      <div className='flex justify-between items-start'>
        <div className='px-4 sm:px-0'>
          <h3 className='text-base font-semibold leading-7 text-gray-900'>
            {design.name}
          </h3>
          <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
            <Breadcrumbs
              breadcrumbs={[
                {
                  label: `${design.defines.name}`,
                  href: `/dashboard/rockets/${design.defines.id}`
                }
              ]}
            />
          </p>
        </div>
        {/* <UpdateRocket id={rocket.id} /> */}
      </div>
      <DesignView design={design} />
      {/* <div className='mt-6 flex items-center justify-end gap-x-6'>
      </div> */}
    </main>
  )
}
