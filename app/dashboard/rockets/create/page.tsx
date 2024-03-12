import Profile from '@/app/ui/dashboard/profile'
import Form from '@/app/ui/rocket/create-form'

export default async function Page (): Promise<React.JSX.Element> {
  return (
    <main>
      <Profile />
      <Form />
    </main>
  )
}
