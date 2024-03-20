import MotorList from '../motors/MotorList'
import SimList from './sim-list'

export default function ConfigView({
  config
}: {
  config: Configuration
}): React.JSX.Element {
  return (
    <div>
      <div className='flex justify-between items-start'>
        <div className='px-4 sm:px-0'>
          <h3 className='text-base font-semibold leading-7 text-gray-900'>
            {config.name}
          </h3>
          <p className='mt-1 max-w-2xl text-sm leading-6 text-gray-500'>
            Rocket configuration details
          </p>
        </div>
        {/* <UpdateRocket id={rocket.id} /> */}
      </div>
      <div className='mt-6 border-t border-gray-100'>
        <dl className='divide-y divide-gray-100'>
          <div className='px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='text-sm font-medium leading-6 text-gray-900'>Motors</dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              <MotorList motors={config.usesMotor} />
            </dd>
          </div>
        </dl>
      </div>
      <SimList listItems={config.validatedBy} label='Simulations' />
    </div>
  )
}
