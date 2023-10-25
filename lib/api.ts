/* eslint-disable @typescript-eslint/no-explicit-any */
const FEATURE_GRAPHQL_FIELDS = `
name
description
href
icon {
  url
}
`

const POST_GRAPHQL_FIELDS = `
slug
title
images
date
author {
  name
  picture {
    url
  }
}
excerpt
content {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}
`

async function fetchGraphQL (query: string, preview = false): Promise<any> {
  return await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`
      },
      body: JSON.stringify({ query }),
      next: { tags: ['posts'] }
    }
  ).then(async (response) => await response.json())
}

function extractPost (fetchResponse: any): any {
  return fetchResponse?.data?.postCollection?.items?.[0]
}

function extractPostEntries (fetchResponse: any): any[] {
  return fetchResponse?.data?.postCollection?.items
}

function extractFeatureEntries (fetchResponse: any): any[] {
  return fetchResponse?.data?.featureCollection?.items
}

export async function getAllFeatures (isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      featureCollection(
        where: { href_exists: true },
        order: weight_ASC
        preview: ${isDraftMode ? 'true' : 'false'}
      ) {
        items {
          ${FEATURE_GRAPHQL_FIELDS}
        }
      }
    }`,
    false
  )
  return extractFeatureEntries(entries)
}

export async function getPostAndMorePosts (
  slug: string,
  preview: boolean
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? 'true' : 'false'
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries)
  }
}
