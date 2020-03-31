import gql from "graphql-tag";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $password: String!
    $passwordConfirm: String!
    $resetToken: String!
  ) {
    resetPassword(
      password: $password
      passwordConfirm: $passwordConfirm
      resetToken: $resetToken
    ) {
      username
      email
    }
  }
`;

export default RESET_MUTATION;
