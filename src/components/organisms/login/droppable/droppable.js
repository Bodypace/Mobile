import React, { createContext, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

export const droppableContext = createContext();

export function useDroppable() {
  return useContext(droppableContext);
}

export const DroppablePhase = Object.freeze({
  COVER: 1,
  TOP: 2,
  BOTTOM: 3,
});

export const Droppable = ({
  phase = null,
  setPhase = null,
  useFormContext = false,
  children,
}) => {
  const containerHeight = React.useRef(0);
  const topHeight = React.useRef(0);
  const { values, setFieldValue } = useFormikContext();

  if (useFormContext) {
    phase = values.phase;
    setPhase = (v) => setFieldValue("phase", v);
  }

  const context = {
    phase,
    setPhase,

    containerHeight,
    topHeight,
  };

  return (
    <droppableContext.Provider value={context}>
      <View
        style={styles.block}
        onLayout={(e) => containerHeight.current = e.nativeEvent.layout.height}
      >
        {children}
      </View>
    </droppableContext.Provider>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignSelf: "stretch",
  },
});

export default Droppable;
