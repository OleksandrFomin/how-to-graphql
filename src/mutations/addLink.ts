import { gql } from "@apollo/client";

export const ADD_LINK = gql`
  mutation AddLink($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
      description
      url
      createdAt
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;
