import { z } from 'zod'

import { motorSchema } from '@/schemas/Motors'

export const manufacturerSchema = z.object({
  name: z.string(),
  id: z.string(),
  motors: z.array(motorSchema).optional(),
})

export const personSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  given_name: z.string(),
  family_name: z.string(),
  picture: z.string().url(),
})

export type Manufacturer = z.infer<typeof manufacturerSchema>
export type Person = z.infer<typeof personSchema>
