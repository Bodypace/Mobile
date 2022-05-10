import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Field } from './field'


export function Fields({ element, item, edit, setEdit }) {
  return (
    element.length === 1 ?
      <View style={styles.container}>
        <Field element={element[0]} item={item} edit={edit} setEdit={setEdit} vertical />
      </View>
      :
      <View style={styles.container}>
        <Field flex element={element[0]} item={item} edit={edit} setEdit={setEdit} vertical />
        {element[1] &&
          <Field element={element[1]} item={item} edit={edit} setEdit={setEdit} vertical />}
        {element[2] &&
          <Field element={element[2]} item={item} edit={edit} setEdit={setEdit} vertical />} 
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    marginBottom: 10, //spacing
    flexDirection: "row",
  },
})