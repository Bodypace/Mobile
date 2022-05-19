import React from "react";
import { TextInput, StyleSheet } from "react-native"
import { roboto } from "../../utils/fonts";
import { useTheme } from "../../utils/themes";


export default function Input({ text, setText, placeholder, secure = false, error = false }) {
  const { general: colors } = useTheme()

  return (
    <TextInput
      style={[styles.input, { borderColor: error ? colors.error : colors.primary }]}
      onChange={e => setText(e.nativeEvent.text)}
      placeholder={placeholder}
      onEndEditing={() => console.log('end editing')}
      onSubmitEditing={() => console.log('submit editing')}
      secureTextEntry={secure}
    >
      {text}
    </TextInput>
  )
}

const styles = StyleSheet.create({
  input: {
    alignSelf: "stretch",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontFamily: roboto.regular,
    fontSize: 18,
  },
})