import { CreateConfig, SimNav } from './buttons'
export default function SimList ({
  listItems = [],
  designId,
  configId,
  // rocketId,
  label
}: {
  listItems: Simulation[] | undefined
  designId: string
  configId: string
  // rocketId: string
  label: string
}): React.JSX.Element {
  const content =
    listItems.length === 0
      ? (
      <CreateConfig />
        )
      : (
      <ul
        role='list'
        className='divide-y divide-gray-100 rounded-md border border-gray-200'
      >
        {listItems.map((sim) => (
          <SimNav
            key={sim.id}
            sim={sim}
            // rocketId={rocketId}
            designId={designId}
            configId={configId}
          />
        ))}
      </ul>
        )

  return (
    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='text-sm font-medium leading-6 text-gray-900'>{label}</dt>
      <dd className='mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
        {content}
      </dd>
    </div>
  )
}
