import React from 'react'
import { StyleSheet } from 'react-native'
import { Separator as BricksSeparator } from '../../../bricks'


export const define = {
  type: "separator",
}

export function Separator() {
  return (
    <BricksSeparator style={styles.separator} />
  )
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  }
})