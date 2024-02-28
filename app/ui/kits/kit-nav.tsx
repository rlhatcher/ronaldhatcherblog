import Link from 'next/link'
import { Badge } from '../badge'
import { ChevronRightIcon } from '@heroicons/react/16/solid'

export function KitNav ({ kit }: { kit: Kit }): JSX.Element {
  return (
    <Link href={`/dashboard/kits/${kit.uniqueID}`}>
      <li
        key={kit.uniqueID}
        className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6 hover:bg-zinc-950/5 dark:hover:bg-white/5'
      >
        <div className='flex w-0 flex-1 items-center'>
          {kit.name}
          <div className='ml-4 flex min-w-0 flex-1 gap-2'>
            <span className='truncate font-medium'>{kit.description}</span>
            <span className='flex-shrink-0 text-gray-400'>{kit.mfgID}</span>
            <Badge key='kit' color='orange'>
              Kit
            </Badge>
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
