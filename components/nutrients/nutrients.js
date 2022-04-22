import React from 'react'
import { View, StyleSheet } from 'react-native'
import Nutrient from './nutrient'
import { readNutrient } from '../../utils/readers'
import { sumBy } from 'lodash'


export default function Nutrients({ style, valueStyle, fields, items, goal, hideTitle }) {
  const sumMeal = (items, field) => sumBy(items, item => readNutrient(item, field))
  const sum = field => items[0].__typename === "MealTime"
    ? sumBy(items, meal => sumMeal(meal.eats, field))
    : sumMeal(items, field)

  return (
    <View style={[styles.container, style]}>
      {fields.map(field =>
        <Nutrient
          key={field}
          field={field}
          hideTitle={hideTitle}
          valueStyle={valueStyle}
          value={sum(field)}
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