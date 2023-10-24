type Meta = {
    slug: string,
    title: string,
    date: string,
    image: string,
    tags: string[],
}

type BlogPost = {
    meta: Meta,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}

type Project = {
    meta: Meta,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}

type Build = {
    meta: Meta,
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}