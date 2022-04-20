import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Logo from '../../components/logo'


export default function Splash() {
  return (
    <View style={styles.container}>
      <Logo noPadding/>
      <Text style={styles.text}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
})