import { z } from 'zod'

import { motorSchema } from '@/schemas/Motors'
import { parentReferenceSchema } from '@/schemas/references'

// Rocket Part
const baseRocketPartSchema = z.object({
  id: z.string(),
  name: z.string(),
  mass: z.number().optional(),
  length: z.number().optional(),
  diameter: z.number().optional(),
  material: z.string().optional(),
})
const rocketPartSchema: z.ZodType<RocketPart> = baseRocketPartSchema.extend({
  composedOf: z.lazy(() => rocketPartSchema.array()),
})
export type RocketPart = z.infer<typeof baseRocketPartSchema> & {
  composedOf: RocketPart[]
}

// .ork File
const orkFileSchema = z.object({
  name: z.string(),
  url: z.string().url(),
})
export type OrkFile = z.infer<typeof orkFileSchema>

// Simulation Data
export const simulationDataSchema = z.object({
  Time: z.array(z.number()),
  Altitude: z.array(z.number()),
  VerticalVelocity: z.array(z.number()),
  VerticalAcceleration: z.array(z.number()),
  TotalVelocity: z.array(z.number()),
  TotalAcceleration: z.array(z.number()),
  PositionEastOfLaunch: z.array(z.number()),
  PositionNorthOfLaunch: z.array(z.number()),
  LateralDistance: z.array(z.number()),
  LateralDirection: z.array(z.number()),
  LateralVelocity: z.array(z.number()),
  LateralAcceleration: z.array(z.number()),
  Latitude: z.array(z.number()),
  Longitude: z.array(z.number()),
  GravitationalAcceleration: z.array(z.number()),
  AngleOfAttack: z.array(z.number()),
  RollRate: z.array(z.number()),
  PitchRate: z.array(z.number()),
  YawRate: z.array(z.number()),
  Mass: z.array(z.number()),
  MotorMass: z.array(z.number()),
  LongitudinalMomentOfInertia: z.array(z.number()),
  RotationalMomentOfInertia: z.array(z.number()),
  CpLocation: z.array(z.number()),
  CgLocation: z.array(z.number()),
  StabilityMarginCalibers: z.array(z.number()),
  MachNumber: z.array(z.number()),
  ReynoldsNumber: z.array(z.number()),
  Thrust: z.array(z.number()),
  DragForce: z.array(z.number()),
  DragCoefficient: z.array(z.number()),
  AxialDragCoefficient: z.array(z.number()),
  FrictionDragCoefficient: z.array(z.number()),
  PressureDragCoefficient: z.array(z.number()),
  BaseDragCoefficient: z.array(z.number()),
  NormalForceCoefficient: z.array(z.number()),
  PitchMomentCoefficient: z.array(z.number()),
  YawMomentCoefficient: z.array(z.number()),
  SideForceCoefficient: z.array(z.number()),
  RollMomentCoefficient: z.array(z.number()),
  RollForcingCoefficient: z.array(z.number()),
  RollDampingCoefficient: z.array(z.number()),
  PitchDampingCoefficient: z.array(z.number()),
  CoriolisAcceleration: z.array(z.number()),
  ReferenceLength: z.array(z.number()),
  ReferenceArea: z.array(z.number()),
  VerticalOrientationZenith: z.array(z.number()),
  LateralOrientationAzimuth: z.array(z.number()),
  WindVelocity: z.array(z.number()),
  AirTemperature: z.array(z.number()),
  AirPressure: z.array(z.number()),
  SpeedOfSound: z.array(z.number()),
  SimulationTimeStep: z.array(z.number()),
  ComputationTime: z.array(z.number()),
})
export type SimulationData = z.infer<typeof simulationDataSchema>

// Simulation
export const simulationSchema = z.object({
  validates: parentReferenceSchema,
  id: z.string(),
  name: z.string(),
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
  optimumdelay: z.string().optional(),
  produces: simulationDataSchema.optional(),
})
export type Simulation = z.infer<typeof simulationSchema>

// Configuration
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
export type Configuration = z.infer<typeof configurationSchema>

// Design
const baseDesignSchema = z.object({
  supports: z.array(configurationSchema).optional(),
  consistsOf: z.array(rocketPartSchema).optional(),
  reflectedIn: orkFileSchema,
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
export const designSchema: z.ZodType<Design> = baseDesignSchema.extend({
  basedOn: z.lazy(() => designSchema.array()),
})
export type Design = z.infer<typeof baseDesignSchema> & {
  basedOn: Design[]
}
