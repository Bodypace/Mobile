import React from "react"
import Item from "./item"
import { elements, fields } from './elements'
import { gql, useApolloClient } from '@apollo/client';


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

export default function GoalItem(goal) {
  const client = useApolloClient()

  const edit = {
    name: "Edit",
    layout: [
      elements.title,
      elements.separator,
      [fields.goal.name],
      [fields.goal.since],
      elements.separator,
      elements.goalLegend,
      fields.goal.water,
      fields.goal.kcal,
      fields.goal.protein,
      fields.goal.carb,
      fields.goal.fat,
      fields.goal.salt,
      elements.separator,
    ],
    action: (id, data) =>
      client.mutate({
        mutation: GOAL_MUTATION,
        variables: { id, data }
      })
  }
  return (
    // spacing = 5
    <Item
      item={goal}
      overlays={[
        edit
      ]}
    />
  )
}
