import { z } from 'zod'

import { designSchema } from '@/schemas/designs'

export const rocketSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: 'Must be 2 or more characters long' }),
  description: z
    .string()
    .min(2, { message: 'Must be 2 or more characters long' }),
  image: z.instanceof(File).optional(),
  builtTo: designSchema,
})

export type Rocket = z.infer<typeof rocketSchema>
