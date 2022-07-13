import React from "react";
import { Text, StyleSheet } from "react-native";

export default function Text_ConfirmationCodeSent() {
  return (
    <Text style={styles.text}>we sent confirmation code to your email at 11:40</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: 'center',
    color: "grey",
    marginVertical: 10,
  },
});
