import React from 'react'
import { View } from 'react-native'


export default function TrackLayout({ children, style, value, store }) {
  return (
    <View style={style} onLayout={e => { store.current = e.nativeEvent.layout[value] }}>
      {children}
    </View>
  )
}