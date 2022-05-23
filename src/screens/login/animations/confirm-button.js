import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from 'react-native'
import TrackLayout from "../track-layout";


export default function ConfirmButton({ children, blockHeight, elevated = false }) {
  const height = useRef(0)

  const marginTop = useRef(new Animated.Value(0)).current;
  const paddingTop = useRef(new Animated.Value(10)).current;
  const marginBottom = 5

  useEffect(() => {
    const toValue = elevated
      ? 0 : blockHeight.current - height.current - marginBottom

    Animated.sequence([
      Animated.timing(marginTop, {
        toValue: toValue < 0 ? 0 : toValue,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(paddingTop, {
        toValue: elevated ? 10 : 0,
        duration: 100,
        useNativeDriver: false,
      })
    ]).start();
  }, [elevated])

  return (
    <Animated.View style={[styles.confirmButton, { marginTop, paddingTop }]} >
      <TrackLayout value="height" store={height}>
        {children}
      </TrackLayout>
    </Animated.View >
  )
}

const styles = StyleSheet.create({
  confirmButton: {
    position: "absolute",
    zIndex: 2,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
})