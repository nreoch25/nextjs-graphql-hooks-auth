import gql from "graphql-tag";

const NEW_MESSAGE = gql`
  subscription {
    newMessage {
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

export default NEW_MESSAGE;
