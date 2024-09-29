import { z } from 'zod'

export const parentReferenceSchema = z.object({
  id: z.string(),
  name: z.string(),
})
