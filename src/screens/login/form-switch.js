import React, { useEffect } from "react";
import { Keyboard, Text, StyleSheet, Pressable } from "react-native";
import { useFormikContext } from "formik";
import { useTheme } from "../../utils/themes";
import LoginPhase from './login-phase';

export default function FormSwitch({ phase, setPhase }) {
  const { general: colors } = useTheme();
  const linkColors = {
    color: colors.primary,
    borderColor: colors.primary,
  };
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (phase === LoginPhase.LOGIN) {
      setConfirmButtonElevated(true);
      setConfirmCodeVisible(false);
    } else if (phase === LoginPhase.REGISTER) {
      setFieldValue("passwordRepeat", "")
      setFieldValue("confirmationCode", "")
      setFieldValue("privacyPolicy", false)
      setFieldValue("termsAndConditions", false)

      setConfirmButtonElevated(false);
      setConfirmCodeVisible(false);
    } else {
      // phase === LoginPhase.CONFIRM_CODE
      setFieldValue("confirmationCode", "")
      setConfirmCodeVisible(true);
    }
  }, [phase]);

  const message =
    phase === LoginPhase.LOGIN
      ? "Don't have an account?"
      : "Already have an account?";

  const link =
    phase === LoginPhase.LOGIN ? "Register with email" : "Login instead";

  const onPress = () => {
    Keyboard.dismiss();
    setPhase(
      phase === LoginPhase.LOGIN ? LoginPhase.REGISTER : LoginPhase.LOGIN
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
    marginLeft: 35,
  },
  link: {
    marginLeft: 4,
    borderBottomWidth: 1,
  },
});
