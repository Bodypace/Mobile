import React from "react";
import { Text, StyleSheet } from "react-native";

export default function Text_ConfirmationCodeSent() {
  return (
    <Text style={styles.text}>we sent confirmation code to your email</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: "grey",
    margin: 10,
  },
});
