import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SingIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
