import { makeVar, useReactiveVar, InMemoryCache } from "@apollo/client";
import moment from "moment";

export const dayVar = makeVar(moment().format("YYYY-MM-DD"));
export const useDay = () => useReactiveVar(dayVar);

export const selectedEatId = makeVar(null);
export const useSelectedEatId = () => useReactiveVar(selectedEatId);

export const selectedGoalId = makeVar(null);
export const useSelectedGoalId = () => useReactiveVar(selectedGoalId);

export const selectedMealId = makeVar(null);
export const useSelectedMealId = () => useReactiveVar(selectedMealId);

export const selectedProductId = makeVar(null);
export const useSelectedProductId = () => useReactiveVar(selectedProductId);

export const cache = new InMemoryCache({
  typePolicies: {
    Eat: {
      fields: {
        isSelected: {
          read(_, { readField }) {
            return selectedEatId() === readField("id");
          },
        },
      },
    },
    Goal: {
      fields: {
        isSelected: {
          read(_, { readField }) {
            return selectedGoalId() === readField("id");
          },
        },
      },
    },
    Meal: {
      fields: {
        isSelected: {
          read(_, { readField }) {
            return selectedMealId() === readField("id");
          },
        },
      },
    },
    Product: {
      fields: {
        isSelected: {
          read(_, { readField }) {
            return selectedProductId() === readField("id");
          },
        },
      },
    },
  },
});
