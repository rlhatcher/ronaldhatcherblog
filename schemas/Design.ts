import { z } from 'zod'

import { parentReferenceSchema } from '@/schemas/core'
import { motorSchema } from '@/schemas/Motor'
import { simulationSchema } from '@/schemas/Simulation'

const baseRocketPartSchema = z.object({
  id: z.string(),
  name: z.string(),
  mass: z.number().optional(),
  length: z.number().optional(),
  diameter: z.number().optional(),
  material: z.string().optional(),
})

export type RocketPart = z.infer<typeof baseRocketPartSchema> & {
  composedOf: RocketPart[]
}

const rocketPartSchema: z.ZodType<RocketPart> = baseRocketPartSchema.extend({
  composedOf: z.lazy(() => rocketPartSchema.array()),
})

export const configurationSchema = z.object({
  validatedBy: z.array(simulationSchema).optional(),
  usesMotor: z.array(motorSchema),
  appliesTo: parentReferenceSchema,
  id: z.string(),
  name: z.string(),
  stageNumber: z.number().optional(),
  stageActive: z.boolean().optional(),
  delay: z.string().optional(),
  ignitionEvent: z.string().optional(),
  ignitionDelay: z.string().optional(),
})

export const designSchema = z.object({
  defines: parentReferenceSchema,
  supports: z.array(configurationSchema).optional(),
  consistsOf: z.array(rocketPartSchema).optional(),
  reflectedIn: z.string().optional(),
  id: z.string(),
  name: z.string(),
  stages: z.string().optional(),
  massEmpty: z.number().optional(),
  stabilityCal: z.number().optional(),
  stabilityPct: z.number().optional(),
  cg: z.number().optional(),
  cp: z.number().optional(),
  totalLength: z.number().optional(),
  maxDiameter: z.number().optional(),
})

export type Configuration = z.infer<typeof configurationSchema>
export type Design = z.infer<typeof designSchema>
