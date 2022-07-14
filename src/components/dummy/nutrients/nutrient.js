import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../../utils/themes'


export default function Nutrient ({
  field, hideTitle = false, valueStyle, value, goal
}) {
  const { general: colors } = useTheme()
  const progress = Math.floor(value / goal * 100)

  value = Math.round(value * 10) / 10
  if (field !== "kcal") {
    value = `${value} g`
  }

  return (
    <View style={styles.container}>
      {!hideTitle && <Text style={styles.title}>{field}</Text>}
      <Text style={[styles.value, valueStyle, { color: colors[field] }]}>{value}</Text>
      {goal && <Text style={styles.progress}>{progress}%</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progress: {
    fontSize: 12,
    fontWeight: 'bold',
  }
})