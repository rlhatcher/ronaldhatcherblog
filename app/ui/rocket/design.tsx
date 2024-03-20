import ConfigList from './config-list'

export default function DesignView ({
  design
}: {
  design: Design
}): React.JSX.Element {
  return (
    <div>
      <div className='flex justify-between items-start'>
        <div className='px-4 sm:px-0'>
          <h3 className='text-base font-semibold leading-7 text-gray-900'>
            {design.name}
          </h3>
          <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
            Rocket design details
          </p>
        </div>
        {/* <UpdateRocket id={rocket.id} /> */}
      </div>
      <div className='mt-6 border-t border-gray-100'>
        <dl className='divide-y divide-gray-100'>
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
              length {design.totalLength} m
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
      <ConfigList listItems={design.supports} label='Configurations' />
    </div>
  )
}
