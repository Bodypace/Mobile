import React, { useEffect } from "react";
import { Keyboard, Text, StyleSheet, Pressable } from "react-native";
import { useFormikContext } from "formik";
import { useTheme } from "../../../utils/themes";
import { DroppablePhase } from "../droppable/droppable";

export default function FormSwitch() {
  const { general: colors } = useTheme();
  const linkColors = {
    color: colors.primary,
    borderColor: colors.primary,
  };
  const {
    values: { phase },
    setFieldValue,
    setFieldTouched,
    handleBlur,
  } = useFormikContext();

  useEffect(() => {
    if (phase === DroppablePhase.TOP) {
      setFieldValue("passwordRepeat", "", false);
      setFieldValue("privacyPolicy", false, false);
      setFieldValue("termsAndConditions", false, false);
      setFieldValue("confirmationCode", "", false);

      setFieldTouched("passwordRepeat", false, false);
      // setFieldTouched("privacyPolicy", false, false);
      // setFieldTouched("termsAndConditions", false, false);
      // setFieldTouched("confirmationCode", false, false);
    } else if (phase === DroppablePhase.BOTTOM) {
      setFieldValue("confirmationCode", "", false);
      // setFieldTouched("confirmationCode", false, false);
    }
  }, [phase]);

  const message =
    phase === DroppablePhase.COVER
      ? "Don't have an account?"
      : "Already have an account?";

  const link =
    phase === DroppablePhase.COVER ? "Register with email" : "Login instead";

  const onPress = () => {
    Keyboard.dismiss();
    setFieldValue(
      "phase",
      phase === DroppablePhase.COVER ? DroppablePhase.TOP : DroppablePhase.COVER
    );
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.register}>{message}</Text>
      <Text style={[styles.link, linkColors]}>{link}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
  },
  link: {
    marginLeft: 4,
    borderBottomWidth: 1,
  },
});
