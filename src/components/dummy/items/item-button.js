import React from "react";
import { Pressable, Text, StyleSheet } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'


export default function ItemButton({ name, onPress }) {
  const icons = {
    Eat: { iconName: "food-apple" },
    Buy: { iconName: "cart-outline" },
    Waste: { iconName: "trash-can-outline" },
    Add: { iconName: "plus-thick" },
    Fav: { iconName: "cards-heart" },
    Edit: { iconName: "edit", iconSet: "material" },
    Remove: { iconName: "trash-can" },

    Save: { iconName: "check", iconSet: "material"},
    "New Product": { iconName: "plus-thick"},
    Dismiss: { iconName: "close", iconSet: "material"},
  }

  const { iconName, iconSet } = icons[name]

  const Icon = iconSet === "material"
    ? MaterialIcons
    : MaterialCommunityIcons

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Icon name={iconName} size={20} color="black" />
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