// app/lib/schema/rocket/rocket.schema.ts
import { z } from 'zod'
import { Identifier } from '../sharedTypes'

export const RocketSchema = z.object({
  id: Identifier,
  name: z.string(),
  isModel: z.boolean(),
  description: z.string().optional(),
  image: z.string().optional(),
  mfgID: Identifier.optional(), // Optional reference to Manufacturer by ID
  basedOn: z.array(Identifier).optional(), // References to Kits by ID
  inspired: z.array(Identifier).optional(), // References to other Rockets by ID
  labels: z.array(z.string()).optional()
})
