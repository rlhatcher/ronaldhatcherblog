import { Build } from "../app/_types/types";

const FEATURE_GRAPHQL_FIELDS = `
name
description
href
icon {
  url
}
`;

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
`;

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["posts"] },
    }
  ).then((response) => response.json());
}

function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.postCollection?.items;
}

function extractFeatureEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.featureCollection?.items;
}

function extractProject(fetchResponse: any): any {
  return fetchResponse?.data?.projectCollection?.items?.[0];
}
function extractProjectEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.projectCollection?.items;
}

function extractBuildEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.buildCollection?.items;
}

function extractBuildEntry(fetchResponse: any): Build {
  return fetchResponse?.data?.buildCollection?.items[0];
}

export async function getPreviewPostBySlug(slug: string): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  );
  return extractPost(entry);
}

export async function getAllPosts(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );
  return extractPostEntries(entries);
}

export async function getAllFeatures(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      featureCollection(where: { href_exists: true }, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          ${FEATURE_GRAPHQL_FIELDS}
        }
      }
    }`,
    false
  );
  return extractFeatureEntries(entries);
}

export async function getAllProjects(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      projectCollection(where: { title_exists: true }, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          title
          overview
          images
          slug
          author {
            name
            picture {
              url
            }
          }
        }
      }
    }`,
    false
  );
  return extractProjectEntries(entries);
}

export async function getAllBuilds(isDraftMode: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      buildCollection(where: { title_exists: true }, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          title
          project {
            slug
            title
            images
          }
          slug
          description
          images
        }
      }
    }`,
    false
  );
  return extractBuildEntries(entries);
}

export async function getStep(
  slug: string,
  step: number,
  isDraftMode: boolean
): Promise<Build> {
  const build = await fetchGraphQL(
    `query {
      buildCollection(where: { slug: "${slug}"}) {
        items {
          title
          project {
            overview
            slug
            title
            images
          }
          stepCollection(where: { step: ${step}}) {
            items {
              step
              title
              description
              images
              content {
                json
              }
            }
          }
          slug
          description
          images
        }
      }
    }`,
    false
  );
  return extractBuildEntry(build);
}

export async function getBuildAndSteps(
  slug: string,
  isDraftMode: boolean
): Promise<Build> {
  const build = await fetchGraphQL(
    `query {
      buildCollection(where: { slug: "${slug}" }, preview: ${
        isDraftMode ? "true" : "false"
      }) {
            items {
              title
              project {
                overview
                slug
                title
                images
              }
              stepCollection {
                items {
                  step
                  title
                  description
                  images
                  content {
                    json
                  }
                }
              }
              slug
              description
              images
            }
      }
    }`,
    false
  );
  return extractBuildEntry(build);
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? "true" : "false"
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}

export async function getProject(slug: string, preview: boolean): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
  projectCollection(where: { slug: "${slug}" }, limit: 1) {
    	items {
      title
      overview
      images
      slug
      author {
        name
        picture {
          url
        }
      }
    }
  }
}`,
    preview
  );
  return {
    project: extractProject(entry),
  };
}
