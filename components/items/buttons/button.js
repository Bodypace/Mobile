import React from "react";
import { Pressable, Text, StyleSheet } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'


export default function Button ({iconName, name, onPress, icons}) {
  const Icon = icons === "material"
    ? MaterialIcons
    : MaterialCommunityIcons

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Icon name={iconName} size={20} color="black"/>
      <Text>{name}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 15,
  }
})