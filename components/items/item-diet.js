import React from 'react'
import Item from './item'
import { elements, fields } from './elements'
import { gql, useApolloClient } from '@apollo/client';


const EAT_MUTATION = gql`
  mutation PatchEat($id: ID!, $data: EatPatch!) {
    patchEat(id: $id, data: $data) {
      success
      eat {
        id
        amount
      }
    }
  }
`;

export default function DietItem({ item }) {
  const client = useApolloClient()

  const edit = {
    name: "Edit",
    layout: [
      elements.title,
      elements.separator,
      [fields.eat.name],
      [fields.eat.vendor, fields.eat.package],
      elements.separator,
      elements.legend,
      fields.eat.kcal,
      fields.eat.protein,
      fields.eat.carb,
      fields.eat.sugar,
      fields.eat.fat,
      fields.eat.saturated,
      fields.eat.salt,
      elements.separator,
      [
        fields.eat.barcode,
        fields.eat.amount,
        fields.eat.price,
      ],
      elements.separator,
    ],
    action: (id, data) =>
      client.mutate({
        mutation: EAT_MUTATION,
        variables: { id, data }
      })
  }

  const remove = {
    name: "Remove",
    layout: [
      elements.title,
      elements.separator,
    ]
  }

  return (
    <Item
      item={item}
      overlays={[
        edit,
        remove
      ]}
    />
  )
}
