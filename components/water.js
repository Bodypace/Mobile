import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ItemsHeader } from './items'


export default function Water ({ water, goal }) {
  const current = water.reduce((sum, glass) => sum + glass.amount, 0)

  return (
    <View style={styles.container}>
      <ItemsHeader
        color="#2D9CDB"
        name="Water"
        remark={`${current} / ${goal.water} L`}
      />
      <View style={{alignItems: 'center'}}>
        <Text style={styles.text}>Water</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  text: {
    fontSize: 24
  }
})