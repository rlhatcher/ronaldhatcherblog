import { z } from 'zod'

import { motorSchema } from '@/schemas/motors'

export const manufacturerSchema = z.object({
  name: z.string(),
  id: z.string(),
  motors: z.array(motorSchema).optional(),
})

export type Manufacturer = z.infer<typeof manufacturerSchema>
