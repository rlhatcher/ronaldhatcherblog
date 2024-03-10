// app/lib/schema/motor.schema.ts
import { z } from 'zod'
import { Identifier } from './sharedTypes'

export const MotorSchema = z.object({
  commonName: z.string(),
  delays: z.string(),
  diameter: z.number(),
  infoUrl: z.string(),
  totImpulseNs: z.number(),
  manufacturer: z.string(),
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
  mfgID: Identifier
})
