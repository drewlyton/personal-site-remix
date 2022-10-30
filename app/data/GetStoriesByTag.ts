import { gql } from "graphql-request";

export default gql`
  query GetStoriesByTag($tags: [Tags!]) {
    stories(
      orderBy: publishedAt_DESC
      where: { tags_contains_some: $tags, preview: false }
      first: 2
    ) {
      id
      title
      description
      mdx
      slug
      publishedAt
      featuredImage {
        url
      }
    }
  }
`;
