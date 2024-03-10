import { z } from 'zod'
import { Identifier } from './sharedTypes'

export const ManufacturerSchema = z.object({
  name: z.string(),
  mfgID: Identifier,
  kits: z.array(Identifier).optional(), // Referencing Kits by ID
  motors: z.array(Identifier).optional() // Referencing Motors by ID
})
