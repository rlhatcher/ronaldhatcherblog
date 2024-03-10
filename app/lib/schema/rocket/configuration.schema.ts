import { z } from 'zod'
import { MotorSchema } from '../motor.schema'
import { SimulationSchema } from './simulation.schema'

export const ConfigurationSchema = z.object({
  id: z.string(),
  name: z.string(),
  design_id: z.string(),
  stageNumber: z.number().optional(),
  stageActive: z.boolean().optional(),
  motor: z.array(MotorSchema).optional(),
  delay: z.string().optional(),
  ignitionEvent: z.string().optional(),
  ignitionDelay: z.string().optional(),
  simulations: z.array(SimulationSchema).optional()
})
