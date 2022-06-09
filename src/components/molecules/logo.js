import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import heart from '../../../assets/heart_512.png';
import { sanchez } from '../../utils/fonts'
import { useTheme } from '../../utils/themes';


export default function Logo({ inverted, noLine }) {
  const { components: { logo: colors } } = useTheme()
  const color = inverted ? colors.inverted : colors.main
  const textColor = { color }
  const lineColor = { backgroundColor: color }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={heart} />
      {noLine ? <></> : <View style={[styles.line, lineColor]} />}
      <Text style={[styles.text, textColor]}>Bodypace</Text>
    </View>
  )
}

const size = 47
const spacing = 11

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    marginRight: spacing,
    height: size,
    width: size,
  },
  line: {
    marginRight: spacing,
    width: 1,
    height: 33,
  },
  text: {
    alignSelf: "stretch",
    textAlignVertical: "center",
    fontFamily: sanchez.regular,
    fontSize: 24,
  },
})