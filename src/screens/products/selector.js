import React from "react";
import { View, Pressable, Text, StyleSheet } from 'react-native'
import { roboto } from "../../utils/fonts";


export default function Selector({ selected, onSetSelected }) {
  const Option = ({ name, count }) => {
    const separatorStyle = count === undefined ? {} : styles.separator
    return (
      <Pressable style={[styles.option, separatorStyle]} onPress={() => onSetSelected(name)}>
        <Text style={selected === name ? styles.selected : styles.name}>{name}</Text>
        <Text style={styles.count}>{count}</Text>
      </Pressable>
    )
  }

  return (
    <View style={styles.options}>
      <Option name="Adding" count={0}/>
      <Option name="Recent" />
      <Option name="Products" />
      <Option name="In Home" />
      <Option name="Favorites" />
    </View>
  )
}

const styles = StyleSheet.create({
  options: {
    alignSelf: "stretch",
    flexDirection: "row",
    marginTop: 5,
    height: 23,
  },
  separator: {
    borderRightWidth: 1,
    borderColor: "darkgreen",
  },
  option: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  name: {
    fontFamily: roboto.regular,
    fontSize: 12,
  },
  selected: {
    fontFamily: roboto.bold,
    fontSize: 14,
  },
  count: {
    alignSelf: "flex-start",
    marginLeft: 2,
    fontSize: 12,
  }
})
