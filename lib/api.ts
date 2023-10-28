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
