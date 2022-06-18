import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from '../../../utils/themes';

export default function Text_Link({ children, onPress }) {
  const { general: colors } = useTheme();
  const linkColors = {
    color: colors.primary,
    borderColor: colors.primary,
  };

  return (
    <Pressable onPress={onPress}>
      <Text style={[styles.link, linkColors]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    marginLeft: 4,
    borderBottomWidth: 1,
  },
});
