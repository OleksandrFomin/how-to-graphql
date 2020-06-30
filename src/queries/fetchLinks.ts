import { gql } from "@apollo/client";

export const FETCH_LINKS = gql`
  query FetchLinks {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
      count
    }
  }
`;
