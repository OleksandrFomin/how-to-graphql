import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;
