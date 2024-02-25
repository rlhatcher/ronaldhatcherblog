import { Button } from '@/app/ui/button'
import { PlusIcon } from '@heroicons/react/16/solid'

export function CreateRocket (): JSX.Element {
  return (
    <Button href='/dashboard/invoices/create'>
      <PlusIcon />
      <span className='hidden md:block'>Create Rocket</span>{' '}
    </Button>
  )
}
