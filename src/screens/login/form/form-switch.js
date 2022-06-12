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
  } = useFormikContext();

  useEffect(() => {
    if (phase === DroppablePhase.TOP) {
      setFieldValue("passwordRepeat", "");
      setFieldValue("confirmationCode", "");
      setFieldValue("privacyPolicy", false);
      setFieldValue("termsAndConditions", false);
    } else if (phase === DroppablePhase.BOTTOM) {
      setFieldValue("confirmationCode", "");
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
    setFieldValue('phase',
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
    margin: 10,
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 50,
  },
  link: {
    marginLeft: 4,
    borderBottomWidth: 1,
  },
});
