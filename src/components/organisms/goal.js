import React from "react";
import { StyleSheet } from "react-native";
import Item from "../dummy/items/item";
import { define as title } from "../../modals/edit/elements/title";
import { define as separator } from "../../modals/edit/elements/separator";
import { define as field } from "../../modals/edit/elements/field";
import { define as legend } from "../../modals/edit/elements/legend";
import { roboto } from "../../utils/fonts";
import { selectedGoalId } from "../../utils/cache";
import { gql, useApolloClient } from "@apollo/client";

const GOAL_MUTATION = gql`
  mutation PatchGoal($id: ID!, $data: GoalPatch!) {
    patchGoal(id: $id, data: $data) {
      success
      goal {
        id
        daySince
        name
        water
        kcal
        protein
        carb
        fat
        salt
      }
    }
  }
`;

export default function Goal(goal) {
  const client = useApolloClient();

  const edit = {
    name: "Edit",
    layout: [
      title,
      separator,
      [field.text("name", (i) => i.name)],
      [field.text("since", (i) => i.daySince)],
      separator,
      legend.perDay,
      field.number("water"),
      field.number("kcal"),
      field.number("protein"),
      field.number("carb"),
      field.number("fat"),
      field.number("salt"),
      separator,
    ],
    action: (id, data) =>
      client.mutate({
        mutation: GOAL_MUTATION,
        variables: { id, data },
      }),
  };

  return (
    <Item
      styles={styles}
      name={goal.name}
      remark="active"
      leftValue={goal.daySince}
      rightValue={`${goal.water} L`}
      nutrientsToShow={["kcal", "protein", "carb", "fat", "salt"]}
      item={goal}
      overlays={[edit]}
      setSelectedId={selectedGoalId}
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
