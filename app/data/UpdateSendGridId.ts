import { gql } from "graphql-request";

export default gql`
  mutation MyMutation(
    $issueNumber: Int
    $sendGridId: String
    $sendGridDesignId: String
  ) {
    updateNewsletter(
      data: { sendGridId: $sendGridId, sendGridDesignId: $sendGridDesignId }
      where: { issueNumber: $issueNumber }
    )
  }
`;
