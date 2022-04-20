import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { dayVar } from '../../utils/cache'


export default function DateBox ({ style, titleStyle, dateStyle, title, date, onPress }) {
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={onPress ? onPress : () => dayVar(date)}
    >
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <Text style={[styles.date, dateStyle]}>{date}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold'
  },
  date: {
    fontSize: 14,
  }
})