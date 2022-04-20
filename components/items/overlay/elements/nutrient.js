import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../../../utils/themes'
import { roboto } from '../../../../utils/fonts'


export default function Nutrient({ element, item }) {
  const { general: colors } = useTheme()
  const { name, values } = element

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      {values.map((value, i) =>
        <Text key={i} style={[styles.value, { color: colors[name] }]}>
          {value(item)}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10, //spacing
  },
  name: {
    flex: 1,
    fontFamily: roboto.light,
    fontSize: 22,
  },
  value: {
    minWidth: 90,
    textAlign: 'right',
    fontFamily: roboto.regular,
    fontSize: 20,
  },
})