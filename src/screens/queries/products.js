import { gql } from "@apollo/client";


export const PRODUCTS_QUERY = gql`
  query ProductsScreen {
    products {
      id
      isSelected @client
      name
      vendor
      size
      kcal
      protein
      carb
      sugar
      fat
      saturated
      salt
    }
  }
`;