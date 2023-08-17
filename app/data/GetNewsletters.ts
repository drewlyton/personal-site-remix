import { gql } from "graphql-request";

export default gql`
  query Newsletters {
    newsletters(orderBy: publishedAt_DESC) {
      createdAt
      publishedAt
      id
      issueNumber
      messageBody
      subject
      publishedAt
      updatedAt
      story {
        title
        description
        featuredImage {
          url
        }
        slug
        author {
          name
          bio
          picture {
            url
          }
        }
      }
    }
  }
`;
