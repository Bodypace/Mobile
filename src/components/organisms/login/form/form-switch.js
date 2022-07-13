import React, { useEffect } from "react";
import { Keyboard, Text, StyleSheet, Pressable } from "react-native";
import { useFormikContext } from "formik";
import { useTheme } from "../../../../utils/themes";
import { DroppablePhase } from "../droppable/droppable";

const useKeyboardState = (initial = false) => {
  const [keyboardVisible, setKeyboardVisible] = React.useState(initial);

  useEffect(() => {
    const listeners = {
      onShow: Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardVisible(true);
      }),

      onHide: Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardVisible(false);
      }),
    };

    return () => {
      listeners.onShow.remove();
      listeners.onHide.remove();
    };
  }, []);

  return keyboardVisible;
};

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
  } = useFormikContext();

  const keyboardVisible = useKeyboardState();
  const [changePhase, setChangePhase] = React.useState(false);

  const switchPhase = () => {
    setFieldValue(
      "phase",
      phase === DroppablePhase.COVER ? DroppablePhase.TOP : DroppablePhase.COVER
    );
  };

  useEffect(() => {
    if (changePhase) {
      if (keyboardVisible) {
        Keyboard.dismiss();
      } else {
        setTimeout(switchPhase, 0);
      }
    }
  }, [changePhase, keyboardVisible]);

  useEffect(() => {
    if (phase === DroppablePhase.TOP) {
      setFieldValue("passwordRepeat", "", false);
      setFieldValue("privacyPolicy", false, false);
      setFieldValue("termsAndConditions", false, false);
      setFieldValue("confirmationCode", "", false);

      setFieldTouched("passwordRepeat", false, false);
    } else if (phase === DroppablePhase.BOTTOM) {
      setFieldValue("confirmationCode", "", false);
    }

    setChangePhase(false);
  }, [phase]);

  const message =
    phase === DroppablePhase.COVER
      ? "Don't have an account?"
      : "Already have an account?";

  const link =
    phase === DroppablePhase.COVER ? "Register with email" : "Login instead";

  return (
    <Pressable style={styles.container} onPress={() => setChangePhase(true)}>
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
