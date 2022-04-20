import React, { useState, useRef } from 'react'
import { View, Text, Pressable, StyleSheet, Vibration } from 'react-native'
import { TextInput } from '../../../../bricks'
import { roboto } from '../../../../utils/fonts'
import { useTheme } from '../../../../utils/themes'


export default function Field({ element, item, edit }) {
  const { general: colors } = useTheme()
  const { name } = element
  const _value = useRef(element.value(item))
  const value = _value.current
  const [text, setText] = useState(value)
  const inputRef = useRef(null)

  const valueStyle = {
    fontFamily: name === "name" ? roboto.bold : roboto.regular
  }

  const changed = text !== value

  const reset = () => {
    if (changed && !inputRef.current.isFocused()) {
      edit.current[name] = undefined
      setText(value)
      Vibration.vibrate(100)
      return true
    }
  }

  const set = ({ nativeEvent: { text: newText } }) => {
    edit.current[name] = value === newText ? undefined : newText
    setText(newText)
  }

  return (
    <Pressable onPress={() => inputRef.current.focus()} onLongPress={reset}>
      <Text style={styles.name}>{name} {changed ? '*' : ''}</Text>
      <TextInput
        ref={inputRef}
        style={[styles.value, valueStyle, { color: colors.text }]}
        onLongPress={reset}
        onChange={set}
        multiline
      >
        {text}
      </TextInput>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  name: {
    marginBottom: 5,
    fontFamily: roboto.light,
    fontSize: 13,
  },
  value: {
    fontSize: 18,
  },
})