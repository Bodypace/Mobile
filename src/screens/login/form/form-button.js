import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { roboto } from "../../../utils/fonts";
import { useTheme } from "../../../utils/themes";
import { useFormikContext } from "formik";
import { DroppablePhase } from "../droppable/droppable";

export default function FormButton() {
  const { general: colors } = useTheme();
  const {
    values: {
      phase,
      email,
      password,
      passwordRepeat,
      privacyPolicy,
      termsAndConditions,
      confirmationCode,
    },
    handleSubmit
  } = useFormikContext();

  const text = phase === DroppablePhase.COVER ? "Login" : "Register";

  const disabled = 
    email === "" ||
    password === "" ||
    (phase !== DroppablePhase.COVER &&
      (password !== passwordRepeat ||
        !privacyPolicy ||
        !termsAndConditions)) ||
    (phase === DroppablePhase.BOTTOM && confirmationCode === "");

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
      <Text style={[styles.text, textColor]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    marginHorizontal: 30,
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,

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
