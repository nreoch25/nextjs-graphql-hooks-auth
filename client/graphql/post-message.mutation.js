import gql from "graphql-tag";

const POST_MESSAGE = gql`
  mutation postMessage($text: String!) {
    postMessage(text: $text) {
      _id
      text
      sender {
        _id
        username
        email
      }
    }
  }
`;

export default POST_MESSAGE;
