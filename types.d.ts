interface Meta {
  slug: string
  title: string
  date: string
  image: string
  tags: string[]
}

interface BlogPost {
  meta: Meta
  content: ReactElement<any, string | JSXElementConstructor<any>>
}

interface Project {
  meta: Meta
  content: ReactElement<any, string | JSXElementConstructor<any>>
}

interface Build {
  meta: Meta
  content: ReactElement<any, string | JSXElementConstructor<any>>
}

interface Step {
  meta: Meta
  content: ReactElement<any, string | JSXElementConstructor<any>>
}
