import React from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Pressable, Text, StyleSheet } from "react-native"
import { useTheme } from "../../utils/themes";


export default function Check ({ text, link, onPress, checked, setChecked }) {
  const { general: colors } = useTheme()
  const linkColors = {
    color: colors.primary, 
    borderColor: colors.primary, 
  }

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {checked !== undefined &&
        <Pressable style={{ borderWidth: 1, width: 20, height: 20, marginRight: 5, }} onPress={() => setChecked(!checked)}>
          {checked && <MaterialIcons name="done" size={20} color={colors.primary} />}
        </Pressable>}
      <Text style={styles.register}>{text}</Text>
      <Text style={[styles.link, linkColors]}>{link}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 35,
  },
  link: {
    marginLeft: 4,
    borderBottomWidth: 1,
  },
})