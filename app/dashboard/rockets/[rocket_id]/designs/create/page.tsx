import Profile from '@/app/ui/dashboard/profile'
import Form from '@/app/ui/rocket/create-design-form'

export default async function Page ({
  params
}: {
  params: { rocket_id: string }
}): Promise<React.JSX.Element> {
  return (
    <main>
      <Profile />
      <Form rocketId={params.rocket_id} />
    </main>
  )
}
