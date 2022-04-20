import React from "react"
import { Text } from 'react-native';
import Spaced from "./spaced";


export default function SpacedTexts({
  style, leftStyle, left, onPressLeft, rightStyle, right, onPressRight
}) {
  return (
    <Spaced style={style} onPressLeft={onPressLeft} onPressRight={onPressRight}>
      <Text style={leftStyle}>{left}</Text>
      <Text style={rightStyle}>{right}</Text>
    </Spaced>
  )
}