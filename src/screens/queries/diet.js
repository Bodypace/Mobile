import { gql } from "@apollo/client";


export const DIET_QUERY = gql`
  query DietScreen($day: String!) {
    diet(day: $day) {
      goal {
        name
        kcal
        protein
        carb
        fat
        salt
        water
      }
      water {
        day
        hour
        amount
      }
      mealTimes {
        day
        hour
        meal {
          name
        }
        eats {
          id
          isSelected @client
          product {
            id
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
          amount
        }
      }
    }
  }
`;