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
  href: string
  label: string
}

interface Meta {
  title: string
  slug: string
  description: string
  date: string
  image: string
  tags: string[]
  type: string
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
  project: string
}

interface StepMeta extends Meta {
  weight: number
}

interface BlogPostMeta extends Meta {
  project: string
}

interface BlogPost {
  meta: BlogPostMeta
  content: ReactElement<any, string | JSXElementConstructor<any>>
}

interface Project {
  meta: Meta
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

interface MotorSample {
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
  thrustCurve?: MotorSample[]
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
}
