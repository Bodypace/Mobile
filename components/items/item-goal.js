import React from "react"
import Item from "./item"
import { elements, fields } from './elements'

export default function GoalItem(goal) {
  const editLayout = [
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
  ]
  return (
    // spacing = 5
    <Item
      item={goal}
      editLayout={editLayout}
    />
  )
}
