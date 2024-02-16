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

interface Kit {
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
  mfgID: string
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
  uniqueID: string
}

interface Manufacturer {
  name: string
  mfgID: string
  kits?: Kit[]
  motors?: Motor[]
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

interface Motor {
  commonName: string
  delays: string
  diameter: number
  infoUrl: string
  totImpulseNs: number
  manufacturer: string
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
  mfgID: string
}

interface Person {
  id: string
  email: string
  given_name: string
  family_name: string
  picture: string
}
