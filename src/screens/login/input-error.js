import React from "react";
import { useTheme } from "../../utils/themes";
import AnimatedText from "./animations/animated-text";
import { useFormikContext } from "formik";

export default function InputError({ name }) {
  const { general: colors } = useTheme();
  const {
    errors: { [name]: error },
    touched: { [name]: touched },
  } = useFormikContext();

  return (
    <AnimatedText
      style={{ color: colors.error, marginLeft: 10 }}
      animated="height"
      hide={0}
      show={20}
      visible={touched && error}
    >
      {error}
    </AnimatedText>
  );
}
