import React from "react";
import FormInput from "./form-input";

export default function FormPassword({ repeat }) {
  return <FormInput name={repeat ? "passwordRepeat" : "password"} secure />;
}

