import React from "react";
import { StyleSheet } from 'react-native';
import { SpacedTexts } from "../../bricks";
import { roboto } from '../../utils/fonts'


export default function SimpleItem({ name, value, onPress, color, isHeader }) {
  const styles = isHeader ? headerStyles : entryStyles
  return (
    <SpacedTexts
      style={styles.container}
      leftStyle={[styles.name, { color }]}
      left={name}
      rightStyle={[styles.value, { color }]}
      right={value}
      onPressRight={onPress}
    />
  )
}

const headerStyles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  name: {
    fontFamily: roboto.light,
    fontSize: 26,
  },
  value: {
    fontFamily: roboto.light,
    fontSize: 16,
  },
})

const entryStyles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
  },
  name: {
    fontFamily: roboto.light,
    fontSize: 18,
  },
  value: {
    fontFamily: roboto.light,
    fontSize: 18,
  },
})