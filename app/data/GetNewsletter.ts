import { gql } from "graphql-request";

export default gql`
  query Newsletters($issueNumber: Int) {
    newsletter(where: { issueNumber: $issueNumber }) {
      createdAt
      publishedAt
      id
      issueNumber
      messageBody
      preview
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
