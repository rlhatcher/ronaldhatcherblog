import { z } from 'zod'

export const personSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  given_name: z.string(),
  family_name: z.string(),
  picture: z.string().url(),
})

export type Person = z.infer<typeof personSchema>
