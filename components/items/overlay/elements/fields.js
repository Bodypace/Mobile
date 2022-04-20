import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Spaced } from '../../../../bricks'
import Field from './field'


export default function Fields({ element, item, edit }) {
  return (
    element.length === 1 ?
      <View style={styles.container}>
        <Field element={element[0]} item={item} edit={edit} />
      </View>
      :
      <Spaced style={styles.container}>
        <Field element={element[0]} item={item} edit={edit} />
        <Field element={element[1]} item={item} edit={edit} />
      </Spaced>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    marginRight: 25,
    marginBottom: 10, //spacing
    flexDirection: "row",
    justifyContent: "space-between",
  },
})