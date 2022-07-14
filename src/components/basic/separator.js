import React from 'react'
import { View, StyleSheet } from 'react-native';


export default function Separator ({ style }) {
  return(
    <View style={[styles.line, style]}/>
  )
}

const styles = StyleSheet.create({
  line: {
    height: 1,
    alignSelf: 'stretch',
  }
})