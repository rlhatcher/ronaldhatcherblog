import { RocketNav } from './buttons'

export default function RocketList ({
  rockets,
  label
}: {
  rockets: Rocket[] | undefined
  label: string
}): React.JSX.Element {
  if (rockets === undefined) {
    return <div>No rockets</div>
  }

  return (
    <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
      <dt className='text-sm font-medium leading-6 text-gray-900'>{label}</dt>
      <dd className='mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
        <ul
          role='list'
          className='divide-y divide-gray-100 rounded-md border border-gray-200'
        >
          {rockets.map((rocket) => {
            return <RocketNav key={rocket.name} rocket={rocket} />
          })}
        </ul>
      </dd>
    </div>
  )
}
