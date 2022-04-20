import React from 'react'
import Item from './item'
import { elements, fields } from './elements'


export default function DietItem({ item }) {
  const editLayout = [
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
    // [
    fields.eat.barcode,
    fields.eat.amount,
    fields.eat.price,
    // ],
    elements.separator,
  ]

  return (
    <Item
      item={item}
      editLayout={editLayout}
      onRemove={() => undefined}
    />
  )
}
