import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from 'react-native'


export default function ConfirmCode({ children, blockHeight, registerHeight, visible }) {
  const marginTop = useRef(new Animated.Value(2000)).current;
  const spacer = 15

  useEffect(() => {
    const toValue = visible
      ? registerHeight.current + spacer
      : blockHeight.current || 1000

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