import { z } from 'zod'
import { ConfigurationSchema } from './configuration.schema'

export const DesignSchema = z.object({
  id: z.string(),
  name: z.string(),
  rocket_id: z.string(),
  filename: z.string().optional(),
  stages: z.string().optional(),
  massEmpty: z.number().optional(),
  stabilityCal: z.number().optional(),
  stabilityPct: z.number().optional(),
  cg: z.number().optional(),
  cp: z.number().optional(),
  length: z.number().optional(),
  maxDiameter: z.number().optional(),
  configurations: z.array(ConfigurationSchema).optional()
})
