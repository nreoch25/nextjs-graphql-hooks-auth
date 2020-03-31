import gql from "graphql-tag";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      _id
      username
      email
    }
  }
`;

export default CURRENT_USER_QUERY;
