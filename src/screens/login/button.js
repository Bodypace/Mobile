import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { roboto } from "../../utils/fonts";
import { useTheme } from "../../utils/themes";
import { useFormikContext } from "formik";
import LoginPhase from './login-phase';


export default function Button({ phase, onPress }) {
  const { general: colors } = useTheme();
  const {
    values: {
      email,
      password,
      passwordRepeat,
      privacyPolicy,
      termsAndConditions,
    },
    setFieldValue,
  } = useFormikContext();

  const text = phase === LoginPhase.LOGIN ? "Login" : "Register";

  const disabled =
    email === "" ||
    password === "" ||
    (phase !== LoginPhase.LOGIN &&
      (!passwordsMatch || !privacyPolicy || !termsAndConditions)) ||
    (phase === LoginPhase.CONFIRM_CODE && confirmCode === "");

  const color = {
    backgroundColor: disabled ? colors.disabled : colors.primary,
  };
  const textColor = {
    color: disabled ? colors.disabledLight : colors.textInverted,
  };

  return (
    <Pressable
      style={[styles.container, color]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, textColor]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    marginHorizontal: 10,
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
