import React from "react";
import FormAccept from "./form-accept";
import FormButton from "./form-button";
import FormError from "./form-error";
import FormInput, { FormEmail } from "./form-input";
import FormPassword, { FormPasswordRemark } from "./form-password";
import FormSwitch from "./form-switch";
import { Formik } from "formik";

const Form = ({ children, ...props }) => {
  return (
    <Formik {...props}>
      <>{children}</>
    </Formik>
  );
};

Form.Accept = FormAccept;
Form.Button = FormButton;
Form.Error = FormError;
Form.Input = FormInput;
Form.Email = FormEmail;
Form.Password = FormPassword;
Form.PasswordRemark = FormPasswordRemark;
Form.Switch = FormSwitch;

export default Form;
