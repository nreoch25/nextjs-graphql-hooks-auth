import gql from "graphql-tag";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`;

export default SIGNIN_MUTATION;
