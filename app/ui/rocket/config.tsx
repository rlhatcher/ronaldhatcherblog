import { DesignNav } from './buttons'
// import SimList from './sim-list'

export default function ConfigView ({
  config
}: {
  config: Configuration
}): React.JSX.Element {
  // const path = `/dashboard/rockets/${design.defines.id}/designs/${design.id}/configurations/`

  return (
    <div>
      <div className='flex justify-between items-start'>
        <div className='px-4 sm:px-0'>
        <DesignNav design={config.appliesTo} />
        </div>
        {/* <UpdateRocket id={rocket.id} /> */}
      </div>
      <div className='mt-6 border-t border-gray-100'>
        {/* <dl className='divide-y divide-gray-100'>
          <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>ID</dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              {design.id}
            </dd>
          </div>
          <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Weights and Measures
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              weight {design.massEmpty} g
              length {design.length} m
              diameter {design.maxDiameter} m
            </dd>
          </div>
          <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>
              Stability
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              {design.stabilityCal} cal
              {design.stabilityPct} %{design.cg} mm (cg)
              {design.cp} mm (cp)
            </dd>
          </div>
        </dl>
      </div>
      <div>
      <ConfigList listItems={design.supports} label='Configurations' path={path} /> */}
      </div>
    </div>
  )
}
