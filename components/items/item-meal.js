import React from "react"
import Item from "./item"
import { elements, fields } from './elements'
import { gql, useApolloClient } from '@apollo/client';


const MEAL_MUTATION = gql`
  mutation PatchMeal($id: ID!, $data: MealPatch!) {
    patchMeal(id: $id, data: $data) {
      success,
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

export default function MealItem(meal) {
  const client = useApolloClient()

  const editAction = (id, data) => {
    client.mutate({
      mutation: MEAL_MUTATION,
      variables: { id, data }
    })
  }

  const edit = {
    action: editAction,
    layout: [
      elements.title,
      elements.separator,
      [fields.meal.name, fields.meal.defaultHour],
      [fields.meal.since, fields.meal.until],
      elements.separator,
    ]
  }

  return (
    // spacing = 10
    <Item
      item={meal}
      editLayout={edit.layout}
      onEdit={edit.action}
    />
  )
}