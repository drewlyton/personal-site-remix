import { gql } from "graphql-request";

export default gql`
  {
    stories(orderBy: publishedAt_DESC, where: { preview: false }) {
      id
      title
      slug
      description
      mdx
      preview
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
