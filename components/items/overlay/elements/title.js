import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { roboto } from '../../../../utils/fonts'

export default function Title({element}) {
  return (
    <Text style={styles.text}>{element.text}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 10, //spacing,
    fontFamily: roboto.regular,
    fontSize: 22,
    color: "black",
  },
})