import React from "react";
import { Pressable, Text, StyleSheet } from 'react-native'

export default function AddMore({ color, onPress }) {
  return (
    <Pressable style={styles.container} onPress={() => undefined}>
      <Text style={[styles.text, {color}]}>(add more)</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  text: {
    marginHorizontal: 10,
  } 
})