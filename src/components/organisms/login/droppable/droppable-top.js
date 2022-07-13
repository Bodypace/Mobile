import React from "react";
import { View } from "react-native";
import { useDroppable } from './droppable';

export default function DroppableTop({ children }) {
  const { topHeight } = useDroppable();

  return (
    <View onLayout={(e) => topHeight.current = e.nativeEvent.layout.height}>
      {children}
    </View>
  );
}
