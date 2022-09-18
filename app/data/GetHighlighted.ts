import { gql } from "graphql-request";

export default gql`
  {
    stories(where: { highlighted: true }) {
      id
      title
      slug
      description
      mdx
      featuredImage {
        url
      }
      publishedAt
      highlighted
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
