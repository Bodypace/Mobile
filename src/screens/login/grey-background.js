import React from "react";
import { Animated, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { DroppablePhase } from "./droppable/droppable";


export default function GreyBackground({ children, top, bottom }) {
  const {
    values: { phase },
  } = useFormikContext();
  const animation = React.useRef(new Animated.Value(0)).current;

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgb(255,255,255)", "rgb(220,220,220)"],
  });

  React.useEffect(() => {
    console.log("interpolate!, phase: ", phase);
    Animated.timing(animation, {
      toValue: phase === DroppablePhase.BOTTOM ? 1 : 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [phase]);

  return (
    <Animated.View
      style={[
        styles.common,
        top && styles.top,
        bottom && styles.bottom,
        { backgroundColor }
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  common: {
    alignSelf: "stretch",
    backgroundColor: "#eee",
    paddingHorizontal: 15,
  },
  top: {
    paddingTop: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottom: {
    paddingBottom: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
