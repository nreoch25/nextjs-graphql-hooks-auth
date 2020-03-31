import gql from "graphql-tag";

const MESSAGES = gql`
  query {
    messages {
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

export default MESSAGES;
