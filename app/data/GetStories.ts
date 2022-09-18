import { gql } from "graphql-request";

export default gql`
  {
    stories(orderBy: publishedAt_DESC) {
      id
      title
      slug
      description
      mdx
      featuredImage {
        url
      }
      highlighted
      publishedAt
      author {
        id
        name
        picture {
          url
        }
      }
    }
  }
`;
