interface FeatureItem {
  title: string
  description: string
  href: string
  icon: string
}

interface ParentReference {
  id: string
  name: string
}

interface PublishedDoc {
  objectKey: string
  url: string
  date: Date
  size: number
}

interface BreadCrumb {
  href?: string
  label: string
}

interface Meta {
  title?: string
  slug: string
  description?: string
  date?: Date
  image?: string
  tags?: string[]
  type?: string
  repo?: string
  imageHeight?: number
  imageWidth?: number
}

interface ImageMeta {
  assetId: string
  publicId: string
  format: string
  bytes: number
  width: number
  height: number
  url: string
}

interface BuildMeta extends Meta {
  designId?: string
  project: string
}

interface StepMeta extends Meta {
  weight: number
}

interface UpdateMeta extends Meta {
  project?: string
  build?: string
}

interface ProjectMeta extends Meta {}

interface Update {
  meta: UpdateMeta
  content: ReactElement<any, string | JSXElementConstructor<any>>
}

interface Project {
  meta: ProjectMeta
  content: ReactElement<any, string | JSXElementConstructor<any>>
}

interface Build {
  meta: BuildMeta
  content: ReactElement<any, string | JSXElementConstructor<any>>
}

interface Step {
  meta: StepMeta
  content: ReactElement<any, string | JSXElementConstructor<any>>
}
interface TagObject {
  value: string
  count: number
}

interface FlightCard {
  id: string
  date?: string
  location?: string
  rocket?: string
  motor?: string
  altitude?: string
  speed?: string
  notes?: string
}

interface Kit {
  id: string
  madeBy: Manufacturer
  url: string
  imageSrc: string
  recommendedEngines: string
  projectedMaxAltitude: string
  recoverySystem: string
  length: string
  diameter: string
  estimatedWeight: string
  estimatedAssemblyTime: string
  finMaterials: string
  decalType: string
  launchSystem: string
  launchRodSize: string
  instructions: string
  ageRecommendation: string
  name: string
  complexity: string
  height: string
  weight: string
  motorMount: string
  parachuteSize: string
  shockCordType: string
  shockCordMount: string
  finThickness: string
  ringThickness: string
  price: string
  currency: string
  sku: string
  stockStatus: string
  description: string
  links: string
  parachute: string
  finArray: string
  labels: string[]
}

interface Manufacturer {
  name: string
  id: string
  kits?: Kit[]
  motors?: Motor[]
}

interface ThrustSample {
  time: number
  thrust: number
}

interface Motor {
  madeBy: Manufacturer
  commonName: string
  delays: string
  diameter: number
  infoUrl: string
  totImpulseNs: number
  burnTimeS: number
  propInfo: string
  length: number
  avgThrustN: number
  dataFiles: string
  impulseClass: string
  sparky: string
  caseInfo: string
  propWeightG: number
  certOrg: string
  motorId: string
  availability: string
  maxThrustN: number
  totalWeightG: number
  designation: string
  updatedOn: string
  type: string
  thrustCurve?: ThrustSample[]
}

interface Person {
  id: string
  email: string
  given_name: string
  family_name: string
  picture: string
}

interface Rocket {
  id: string
  name: string
  isModel: boolean
  description?: string
  image?: string
  basedOn?: Array<Kit | Rocket>
  definedBy?: Design[]
  inspired?: Rocket[]
  labels?: string[]
}

interface Design {
  defines: Rocket
  supports?: Configuration[]
  reflectedIn?: string
  id: string
  name: string
  stages?: string
  massEmpty?: number
  stabilityCal?: number
  stabilityPct?: number
  cg?: number
  cp?: number
  totalLength?: number
  maxDiameter?: number
}

interface Configuration {
  validatedBy?: Simulation[]
  usesMotor: Motor[]
  appliesTo: ParentReference
  id: string
  name: string
  stageNumber?: number
  stageActive?: boolean
  delay?: string
  ignitionEvent?: string
  ignitionDelay?: string
}

interface Simulation {
  validates: ParentReference
  id: string
  name: string
  simulator?: string
  calculator?: string
  maxaltitude?: string
  maxvelocity?: string
  maxacceleration?: string
  maxmach?: string
  timetoapogee?: string
  flighttime?: string
  groundhitvelocity?: string
  launchrodvelocity?: string
  deploymentvelocity?: string
  optimumdelay?: string
  simulationData?: SimulationData
}

interface SimulationData {
  Time: number[]
  Altitude: number[]
  VerticalVelocity: number[]
  VerticalAcceleration: number[]
  TotalVelocity: number[]
  TotalAcceleration: number[]
  PositionEastOfLaunch: number[]
  PositionNorthOfLaunch: number[]
  LateralDistance: number[]
  LateralDirection: number[]
  LateralVelocity: number[]
  LateralAcceleration: number[]
  Latitude: number[]
  Longitude: number[]
  GravitationalAcceleration: number[]
  AngleOfAttack: number[]
  RollRate: number[]
  PitchRate: number[]
  YawRate: number[]
  Mass: number[]
  MotorMass: number[]
  LongitudinalMomentOfInertia: number[]
  RotationalMomentOfInertia: number[]
  CpLocation: number[]
  CgLocation: number[]
  StabilityMarginCalibers: number[]
  MachNumber: number[]
  ReynoldsNumber: number[]
  Thrust: number[]
  DragForce: number[]
  DragCoefficient: number[]
  AxialDragCoefficient: number[]
  FrictionDragCoefficient: number[]
  PressureDragCoefficient: number[]
  BaseDragCoefficient: number[]
  NormalForceCoefficient: number[]
  PitchMomentCoefficient: number[]
  YawMomentCoefficient: number[]
  SideForceCoefficient: number[]
  RollMomentCoefficient: number[]
  RollForcingCoefficient: number[]
  RollDampingCoefficient: number[]
  PitchDampingCoefficient: number[]
  CoriolisAcceleration: number[]
  ReferenceLength: number[]
  ReferenceArea: number[]
  VerticalOrientationZenith: number[]
  LateralOrientationAzimuth: number[]
  WindVelocity: number[]
  AirTemperature: number[]
  AirPressure: number[]
  SpeedOfSound: number[]
  SimulationTimeStep: number[]
  ComputationTime: number[]
}

interface Club {
  id: string
  name: string
  location: string
  website: string
  image: string
  description: string
  members?: Person[]
  manages?: LaunchSite[]
  events?: LaunchEvent[]
  sanctionedBy?: GoverningBody
}

interface GoverningBody {
  id: string
  name: string
  location: string
  website: string
  image: string
  description: string
}

interface LaunchEvent {
  id: string
  name: string
  frequency: string
  launchedAt?: Flight[]
  organisedBy?: Club
  location?: LaunchSite
}

interface Flight {
  id: string
  name?: string
  launched?: string
  produces?: FlightData[]
  launchedWith?: Configuration
  launchedFrom?: LaunchSite
  launchedAt?: LaunchEvent
  lauchedBy?: Person
  date?: string
}

interface LaunchSite {
  id: string
  name: string
  longitude: string
  latitude: string
  altitude: string
  longitude: string
  latitude: string
  altitude: string
  description: string
  events?: LaunchEvent[]
  flights?: Flight[]
  managedBy?: Club
  weather?: WeatherModelRun
}

interface FlightData {
  id: string
  producedBy: Flight
}

interface WeatherModelRun {
  initialTime: string
  model: string
  modelRun: string
  location: string
  latitude: number
  longitude: number
  timezone: string
  predicts: WeatherForecast[]
}

interface WeatherForecast {
  temperature: number
  dewpoint: number
  rain: number
  freezinglevel: number
  uvIndex: number
  totalcloud: number
  lowcloud: number
  medcloud: number
  highcloud: number
  humidity: number
  windspeed: number
  meansealevelpressure: number
  windgustspeed: number
  winddirection: number
  windletter: string
  icon: string
  iconName: string
  chanceofrain: number
  chanceofsnow: number
  dayOfWeek: number
  weekday: string
  sunrise: string
  sunset: string
  cumulusBaseHeight: number
  stratusBaseHeight: number
  dayOrNight: string
  utcTime: string
}
