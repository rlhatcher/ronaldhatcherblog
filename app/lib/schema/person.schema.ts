import { z } from 'zod'
import { Identifier } from './sharedTypes'

export const PersonSchema = z.object({
  id: Identifier,
  email: z.string(),
  given_name: z.string(),
  family_name: z.string(),
  picture: z.string().optional()
})
