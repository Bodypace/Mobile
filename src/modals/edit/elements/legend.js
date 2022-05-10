import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { roboto } from '../../../utils/fonts'
import { useTheme } from '../../../utils/themes'


export const define = {
  per100g: {
    type: "legend",
    name: "in 100 g",
    extra: {
      color: "amount",
      name: "ate",
    }
  },
  perDay: {
    type: "legend",
    name: "in a day",
  }
}

export function Legend({ element, item, edit }) {
  const { general: colors } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={styles.in100g}>{element.name}</Text>
      {element.extra &&
        <Text style={[styles.amount, { color: colors[element.extra.color] }]}>
          {element.extra.name} ({edit.amount || item.amount} g)
        </Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    marginBottom: 10, //spacing,
  },
  amount: {
    textAlign: 'right',
    fontFamily: roboto.regular,
    fontSize: 13,
  },
  in100g: {
    textAlign: 'right',
    minWidth: 90,
    fontFamily: roboto.light,
    fontSize: 13,
  },
})