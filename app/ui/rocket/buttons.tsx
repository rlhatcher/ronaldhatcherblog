import { Button } from '@/app/ui/button'
import {
  ChevronRightIcon,
  PencilIcon,
  PlusIcon
} from '@heroicons/react/16/solid'
import Link from 'next/link'
import { Badge } from '../badge'

export function CreateRocket (): JSX.Element {
  return (
    <Button href='/dashboard/rockets/create'>
      <PlusIcon />
      <span className='hidden md:block'>Create Rocket</span>{' '}
    </Button>
  )
}

export function CreateDesign (): JSX.Element {
  return (
    <Button href='/dashboard/designs/create'>
      <PlusIcon />
      <span className='hidden md:block'>Create Design</span>{' '}
    </Button>
  )
}

export function CreateConfig (): JSX.Element {
  return (
    <Button href='/dashboard/designs/create-config'>
      <PlusIcon />
      <span className='hidden md:block'>Create Config</span>{' '}
    </Button>
  )
}

export function UpdateRocket ({ id }: { id: string }): JSX.Element {
  return (
    <Link
      href={`/dashboard/rockets/${id}/edit`}
      className='rounded-md border p-2 hover:bg-gray-100'
    >
      <PencilIcon className='w-5' />
    </Link>
  )
}

export function RocketNav ({ rocket }: { rocket: Rocket }): JSX.Element {
  return (
    <Link href={`/dashboard/rockets/${rocket.id}`}>
      <li
        key={rocket.name}
        className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6 hover:bg-zinc-950/5 dark:hover:bg-white/5'
      >
        <div className='flex w-0 flex-1 items-center'>
          {rocket.id}
          <div className='ml-4 flex min-w-0 flex-1 gap-2'>
            <span className='truncate font-medium'>{rocket.name}</span>
            <span className='flex-shrink-0 text-gray-400'>{rocket.mfgID}</span>
            {rocket.isModel
              ? (
              <Badge key='model' color='emerald'>
                Model
              </Badge>
                )
              : (
              <Badge key='rocket' color='blue'>
                Rocket
              </Badge>
                )}
          </div>
        </div>
        <div className='ml-4 flex-shrink-0'>
          <ChevronRightIcon
            className='h-5 w-5 flex-shrink-0 text-gray-400'
            aria-hidden='true'
          />
        </div>
      </li>
    </Link>
  )
}

export function DesignNav ({ design }: { design: Design }): JSX.Element {
  return (
    <Link href={`/dashboard/designs/${design.id}`}>
      <li
        key={design.name}
        className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6 hover:bg-zinc-950/5 dark:hover:bg-white/5'
      >
        <div className='flex w-0 flex-1 items-center'>
          {design.name}
          <div className='ml-4 flex min-w-0 flex-1 gap-2'>
            <span className='truncate font-medium'>{design.name}</span>
            <span className='flex-shrink-0 text-gray-400'>
              {design.filename}
            </span>
          </div>
        </div>
        <div className='ml-4 flex-shrink-0'>
          <ChevronRightIcon
            className='h-5 w-5 flex-shrink-0 text-gray-400'
            aria-hidden='true'
          />
        </div>
      </li>
    </Link>
  )
}

export function ConfigNav ({ config }: { config: Configuration }): JSX.Element {
  if (config.motor === undefined) {
    return (<div> </div>)
  }
  return (
    <Link href={`/dashboard/designs/${config.id}`}>
      <li
        key={config.id}
        className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6 hover:bg-zinc-950/5 dark:hover:bg-white/5'
      >
        <div className='flex w-0 flex-1 items-center'>
          {config.motor[0].designation}-{config.motor[0].manufacturer}
          <div className='ml-4 flex min-w-0 flex-1 gap-2'>
            <span className='truncate font-medium'>{config.motor[0].designation}</span>
            <span className='flex-shrink-0 text-gray-400'>
              {config.motor[0].manufacturer}
            </span>
          </div>
        </div>
        <div className='ml-4 flex-shrink-0'>
          <ChevronRightIcon
            className='h-5 w-5 flex-shrink-0 text-gray-400'
            aria-hidden='true'
          />
        </div>
      </li>
    </Link>
  )
}

export function UploadDesign (): JSX.Element {
  return (
    <Button href='/dashboard/designs/upload'>
      <PlusIcon />
      <span className='hidden md:block'>Upload .ork</span>{' '}
    </Button>
  )
}

// export function DeleteRocket ({ id }: { id: string }): JSX.Element {
//   const deleteRocketWithId = deleteRocket.bind(null, id)

//   return (
//     <form action={deleteRocketWithId}>
//       <button className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-5" />
//       </button>
//     </form>
//   )
// }
