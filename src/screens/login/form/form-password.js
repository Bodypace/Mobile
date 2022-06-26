import React from "react";
import FormInput from "./form-input";
import { useFormikContext } from "formik";
import { DroppablePhase } from "../droppable/droppable";

export default function FormPassword({ repeat }) {
  let {
    values: { phase },
  } = useFormikContext();

  return (
    <FormInput
      name={repeat ? "passwordRepeat" : "password"}
      secure
      disable={phase === DroppablePhase.BOTTOM}
    />
  );
}
