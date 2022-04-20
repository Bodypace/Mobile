import React from "react";
import { Pressable, Text, StyleSheet } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { roboto } from "../../../../utils/fonts"


export default function Button ({ iconName, name, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <MaterialIcons name={iconName} size={28} />
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: roboto.bold,
    fontSize: 18,
  }
})