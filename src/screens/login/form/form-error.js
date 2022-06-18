import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { useTheme } from "../../../utils/themes";
import { useFormikContext } from "formik";

export default function FormError({ name }) {
  const { general: colors } = useTheme();
  const value = useRef(new Animated.Value(0)).current;
  const {
    errors: { [name]: error },
    touched: { [name]: touched },
  } = useFormikContext();
  const visible = touched && error 

  useEffect(() => {
    Animated.timing(value, {
      toValue: visible ? 20 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [visible]);

  return (
    <Animated.Text
      style={[styles.text, { color: colors.error }, { height: value }]}
    >
      {error}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  text: {

  }
})
