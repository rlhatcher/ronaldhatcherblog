import { z } from 'zod'

import { parentReferenceSchema } from '@/schemas/core'

export const thrustSampleSchema = z.object({
  time: z.number(),
  thrust: z.number(),
})

export const motorSchema = z.object({
  madeBy: parentReferenceSchema,
  commonName: z.string(),
  delays: z.string(),
  diameter: z.number(),
  infoUrl: z.string(),
  totImpulseNs: z.number(),
  burnTimeS: z.number(),
  propInfo: z.string(),
  length: z.number(),
  avgThrustN: z.number(),
  dataFiles: z.string(),
  impulseClass: z.string(),
  sparky: z.string(),
  caseInfo: z.string(),
  propWeightG: z.number(),
  certOrg: z.string(),
  motorId: z.string(),
  availability: z.string(),
  maxThrustN: z.number(),
  totalWeightG: z.number(),
  designation: z.string(),
  updatedOn: z.string(),
  type: z.string(),
  thrustCurve: z.array(thrustSampleSchema).optional(),
})

export type ThrustSample = z.infer<typeof thrustSampleSchema>
export type Motor = z.infer<typeof motorSchema>
