import React from 'react'
import { View, StyleSheet } from 'react-native'
import Nutrient from './nutrient'
import { readNutrient } from '../../utils/readers'


export default function Nutrients ({ style, valueStyle, fields, items, goal, hideTitle }) {
  const sumMealTime = (field, items) =>
    items.reduce(
      (sum, item) => sum + (readNutrient(item, field) || 0),
      0
    )

  const typename = items[0].__typename

  const sum = typename === "MealTime"
    ? field => items.reduce((sum, mealTime) => sum + (sumMealTime(field, mealTime.eats)), 0)
    // : typename === "Goal"
    // ? field => items
    : field => sumMealTime(field, items)

  return (
    <View style={[styles.container, style]}>
      {fields.map(field =>
        <Nutrient
          key={field}
          field={field}
          hideTitle={hideTitle}
          valueStyle={valueStyle}
          // value={sum(field)}
          value={readNutrient(items[0], field)}
          // value={100}
          goal={goal && goal[field]}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  }
})