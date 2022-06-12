import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import FormInput from "./form-input";
import { useTheme } from "../../../utils/themes";

export default function FormPassword({ repeat }) {
  const {
    values: { password, passwordRepeat },
  } = useFormikContext();

  const name = !repeat ? "password" : "passwordRepeat";
  const error = !repeat
    ? false
    : password !== "" && password !== passwordRepeat;

  return <FormInput name={name} secure error={error} />;
}

export const FormPasswordRemark = () => {
  const { general: colors } = useTheme();
  const { values } = useFormikContext();

  return (
    values.password !== "" && (
      <Text
        style={[
          styles.passwordRemark,
          {
            color:
              values.password === values.passwordRepeat
                ? colors.good
                : colors.error,
          },
        ]}
      >
        {values.password === values.passwordRepeat
          ? "passwords match"
          : "enter the same password twice"}
      </Text>
    )
  );
};

const styles = StyleSheet.create({
  passwordRemark: {
    marginLeft: 25,
    marginBottom: 10,
  },
});
