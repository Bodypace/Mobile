import React from "react";
import { StyleSheet } from "react-native";
import { Separator as BricksSeparator } from "../../../components/basic/separator";

export const define = {
  type: "separator",
};

export function Separator() {
  return <BricksSeparator style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
  },
});
