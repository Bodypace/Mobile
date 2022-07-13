import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { roboto } from "../../../../utils/fonts";
import { useTheme } from "../../../../utils/themes";
import { useFormikContext } from "formik";
import { DroppablePhase } from "../droppable/droppable";

export default function FormButton() {
  const { general: colors } = useTheme();
  const {
    values: { phase },
    errors,
    handleSubmit,
  } = useFormikContext();

  const disabled = Object.keys(errors).length !== 0;

  const color = {
    backgroundColor: disabled ? colors.disabled : colors.primary,
  };

  const textColor = {
    color: disabled ? colors.disabledLight : colors.textInverted,
  };

  return (
    <Pressable
      style={[styles.container, color]}
      onPress={handleSubmit}
      disabled={disabled}
    >
      <Text style={[styles.text, textColor]}>
        {phase === DroppablePhase.COVER ? "Login" : "Register"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontFamily: roboto.bold,
    fontSize: 22,
  },
});
