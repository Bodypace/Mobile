import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from 'react-native'
import { useDroppable, DroppablePhase } from './droppable';


export default function DroppableBottom({ children }) {
  const { containerHeight, topHeight, phase} = useDroppable()
  const visible = phase === DroppablePhase.BOTTOM
  const marginTop = useRef(new Animated.Value(2000)).current;
  const spacer = 0

  useEffect(() => {
    const toValue = visible
      ? topHeight.current + spacer
      : containerHeight.current || 1000

    Animated.timing(marginTop, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [visible])

  return (
    <Animated.View style={[styles.container, { marginTop }]}>
      {children}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
})