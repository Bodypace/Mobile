import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { roboto } from "../../utils/fonts";
import { useTheme } from "../../utils/themes";
import { useFormikContext } from "formik";

export default function Input({ name, secure = false, error = false }) {
  const { general: colors } = useTheme();
  const {
    values: { [name]: value },
    handleChange,
    handleBlur,
  } = useFormikContext();

  return (
    <TextInput
      style={[
        styles.input,
        { borderColor: error ? colors.error : colors.primary },
      ]}
      secureTextEntry={secure}
      placeholder={name}
      value={value}
      onChangeText={handleChange(name)}
      onBlur={handleBlur(name)}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    alignSelf: "stretch",
    margin: 10,
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontFamily: roboto.regular,
    fontSize: 18,
  },
});
