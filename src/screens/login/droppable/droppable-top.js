import React from "react";
import { View } from "react-native";
import { useDroppable } from './droppable';

export default function DroppableTop({ children }) {
  const { setTopHeight } = useDroppable();

  return (
    <View onLayout={(e) => setTopHeight(e.nativeEvent.layout.height)}>
      {children}
    </View>
  );
}
