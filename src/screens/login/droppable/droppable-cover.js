import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { useDroppable, DroppablePhase } from "./droppable";

export default function DroppableCover({ children }) {
  const { containerHeight, phase } = useDroppable();
  const elevated = phase === DroppablePhase.COVER
  const height = useRef(0);

  const marginTop = useRef(new Animated.Value(0)).current;
  const paddingTop = useRef(new Animated.Value(10)).current;
  const marginBottom = 5;

  useEffect(() => {
    const toValue = elevated
      ? 0
      : containerHeight - height.current - marginBottom;

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
      }),
    ]).start();
  }, [elevated]);

  return (
    <Animated.View style={[styles.confirmButton, { marginTop, paddingTop }]}>
      <View onLayout={(e) => (height.current = e.nativeEvent.layout.height)}>
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  confirmButton: {
    position: "absolute",
    zIndex: 2,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
});
