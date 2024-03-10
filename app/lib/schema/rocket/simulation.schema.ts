import { z } from 'zod'

export const SimulationSchema = z.object({
  id: z.string(),
  name: z.string(),
  config_id: z.string(),
  simulator: z.string().optional(),
  calculator: z.string().optional(),
  maxaltitude: z.string().optional(),
  maxvelocity: z.string().optional(),
  maxacceleration: z.string().optional(),
  maxmach: z.string().optional(),
  timetoapogee: z.string().optional(),
  flighttime: z.string().optional(),
  groundhitvelocity: z.string().optional(),
  launchrodvelocity: z.string().optional(),
  deploymentvelocity: z.string().optional(),
  optimumdelay: z.string().optional()
})
