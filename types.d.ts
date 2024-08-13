interface ParentReference {
  id: string
  name: string
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
  feedType: string
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
