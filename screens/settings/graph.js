import { useQuery, gql } from "@apollo/client";

export const USER_QUERY = gql`
  query CurrentUser {
    user {
      email
      glassSize
      language
      currency
      goals {
        id
        isSelected @client
        name
        daySince
        water
        kcal
        protein
        carb
        fat
        salt
      }
      meals {
        id
        isSelected @client
        name
        daySince
        dayUntil
        defaultHour
      }
    }
  }
`;

export const useUserQuery = () => useQuery(
  USER_QUERY,
  { fetchPolicy: "network-only" }
);