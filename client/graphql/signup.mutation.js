import gql from "graphql-tag";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    signupUser(
      email: $email
      username: $username
      password: $password
      passwordConfirm: $passwordConfirm
    ) {
      token
    }
  }
`;

export default SIGNUP_MUTATION;
