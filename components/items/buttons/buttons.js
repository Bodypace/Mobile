import React from "react";
import { View, StyleSheet } from 'react-native'
import Button from "./button";


export default function Buttons(props) {
  const buttons = [
    { iconName: "food-apple", name: "Eat", prop: "onEat" },
    { iconName: "cart-outline", name: "Buy", prop: "onBuy" },
    { iconName: "trash-can-outline", name: "Waste", prop: "onWaste" },
    { iconName: "plus-thick", name: "Add", prop: "onAdd" },
    { iconName: "cards-heart", name: "Fav", prop: "onFav" },
    { iconName: "edit", name: "Edit", prop: "onEdit", icons: "material" },
    { iconName: "trash-can", name: "Remove", prop: "onRemove" },
  ]

  return (
    <View style={[styles.container, props.style]}>
      {buttons.map(({ iconName, name, prop, icons }) =>
        (props[prop]) &&
        <Button
          key={name}
          iconName={iconName}
          name={name}
          onPress={props[prop]}
          icons={icons}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
})