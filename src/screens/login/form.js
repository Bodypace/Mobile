import React from "react";
import { Text } from "react-native"
import Button from "./button";
import Input from "./input";
import Accept from "./accept";
import { Formik, useFormikContext } from "formik";
import InputError from "./input-error";

const Form = ({ children, ...props }) => {
  return (
    <Formik {...props}>
      <>{children}</>
    </Formik>
  );
};

Form.Input = Input;
Form.Error = InputError;
Form.Accept = Accept;

const Password = ({ repeat }) => {
  const { values } = useFormikContext();
  const name = !repeat ? "password" : "passwordRepeat";
  const error = !repeat
    ? false
    : values.password !== "" && values.password !== values.passwordRepeat;

  return <Input name={name} secure error={error} />;
};

Form.Email = () => <Input name="email" />;
Form.Password = Password;

Form.PasswordRemark = () => {
  const { values } = useFormikContext();

  return (
    values.password !== "" && (
      <Text
        style={[
          // styles.passwordRemark,
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

export default Form;
