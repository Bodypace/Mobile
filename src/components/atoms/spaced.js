import React from 'react'
import { View, Pressable, StyleSheet } from 'react-native'


export default function Spaced({ style, children, onPressLeft, onPressRight }) {
  const [left, right] = children

  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.left} onPress={onPressLeft} disabled={onPressLeft === undefined}>
        {left}
      </Pressable>
      <Pressable style={styles.right} onPress={onPressRight} disabled={onPressRight === undefined}>
        {right}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  left: {
    flex: 1,
  },
  right: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    minWidth: 70,
  },
})