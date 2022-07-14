import React from "react";
import { StyleSheet } from "react-native";
import Item from "../molecules/items/item";
import { define as title } from "../../modals/edit/elements/title";
import { define as separator } from "../../modals/edit/elements/separator";
import { define as field } from "../../modals/edit/elements/field";
import { roboto } from "../../utils/fonts";
import { selectedMealId } from "../../utils/cache";
import { gql, useApolloClient } from "@apollo/client";

const MEAL_MUTATION = gql`
  mutation PatchMeal($id: ID!, $data: MealPatch!) {
    patchMeal(id: $id, data: $data) {
      success
      meal {
        id
        name
        daySince
        dayUntil
        defaultHour
      }
    }
  }
`;

export default function Meal(meal) {
  const client = useApolloClient();

  const edit = {
    name: "Edit",
    layout: [
      title,
      separator,
      [
        field.text("name", (i) => i.name),
        field.text("default hour", (i) => i.defaultHour.slice(0, 5)),
      ],
      [
        field.text("since", (i) => i.daySince),
        field.text("until", (i) => i.dayUntil || "-"),
      ],
      separator,
    ],
    action: (id, data) =>
      client.mutate({
        mutation: MEAL_MUTATION,
        variables: { id, data },
      }),
  };

  const dayUntil = meal.dayUntil || "now";

  return (
    <Item
      styles={styles}
      name={meal.name}
      remark="active"
      leftValue={`${meal.daySince} - ${dayUntil}`}
      rightValue={meal.defaultHour.slice(0, 5)}
      item={meal}
      overlays={[edit]}
      setSelectedId={selectedMealId}
    />
  );
}

const commonStyle = StyleSheet.create({
  text: {
    fontFamily: roboto.light,
    fontSize: 16,
  },
});

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 25,
  },
  selectedContainer: {
    backgroundColor: "#E5FCDD",
    paddingBottom: 5,
  },
  name: {
    fontFamily: roboto.light,
    fontSize: 22,
  },
  remark: commonStyle.text,
  leftValue: commonStyle.text,
  rightValue: commonStyle.text,
});
