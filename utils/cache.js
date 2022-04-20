import { makeVar, useReactiveVar, InMemoryCache } from '@apollo/client';
import moment from 'moment'

export const dayVar = makeVar(moment('2022-04-13').format('YYYY-MM-DD'));
// export const dayVar = makeVar(moment().format('YYYY-MM-DD'));
export const useDay = () => useReactiveVar(dayVar)

export const selectedItemId = makeVar(null)
export const useSelectedItemId = () => useReactiveVar(selectedItemId)

export const selectedGoalId = makeVar(null)
export const useSelectedGoalId = () => useReactiveVar(selectedGoalId)

export const selectedMealId = makeVar(null)
export const useSelectedMealId = () => useReactiveVar(selectedMealId)

export const cache = new InMemoryCache({
  typePolicies: {
    Eat: {
      fields: {
        isSelected: {
          read(_, { readField }) {
            return selectedItemId() === readField("id")
          }
        }
      }
    },
    Goal: {
      fields: {
        isSelected: {
          read(_, { readField }) {
            return selectedGoalId() === readField("id")
          }
        }
      }
    },
    Meal: {
      fields: {
        isSelected: {
          read(_, { readField }) {
            return selectedMealId() === readField("id")
          }
        }
      }
    }
  }
});
