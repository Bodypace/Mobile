import { gql } from "@apollo/client";


export const HOME_QUERY = gql`
  query Home($day: String!) {
    home(day: $day) {
      inventory {
        product {
          id
          name
          vendor
          kcal
          protein
          carb
          sugar
          fat
          saturated
          salt
        }
        amount
        price
      }
      shoppingList {
        product {
          id
          name
          vendor
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
      wasted {
        product {
          id
          name
          vendor
          kcal
          protein
          carb
          sugar
          fat
          saturated
          salt
        }
        amount
        buy {
          price
        }
      }
      goal {
        id
        name
        kcal
        protein
        carb
        fat
        salt
        water
      }
      mealTimes {
        day
        hour
        meal {
          name
        }
        eats {
          id
          product {
            id
            name
            vendor
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