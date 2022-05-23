import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native'


export default function AnimatedText({ children, style, animated, hide, show, visible = false }) {
  const value = useRef(new Animated.Value(hide)).current;

  useEffect(() => {
    Animated.timing(value, {
      toValue: visible ? show : hide,
      duration: 250,
      useNativeDriver: false,
    }).start()
  }, [visible])

  return (
    <Animated.Text style={[style, { [animated]: value }]}>
      {children}
    </Animated.Text>
  )
}