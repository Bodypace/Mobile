import React from "react";
import { Screen } from "../../components/atoms";
import { Logo } from "../../components/molecules";
import { useAuth } from "../../utils/auth";
import * as Yup from "yup";
import Form from "./form";
import Droppable from './droppable';
import { DroppablePhase } from "./droppable/droppable";
import Texts from "./texts";


export default function Login() {
  const auth = useAuth();

  const schema = Yup.object().shape({
    email: Yup.string()
      .min(2, "Too short!")
      .max(70, "Too long!")
      .required("Required"),
  });

  const initialValues = {
    email: "",
    password: "",
    passwordRepeat: "",
    confirmationCode: "",
    privacyPolicy: false,
    termsAndConditions: false,
  };

  const onSubmit = async ({ phase, email, password }, { setFieldValue }) => {
    console.log('onSubmit() login screen form')
    if (phase === DroppablePhase.COVER) {
      try {
        await auth.login(email, password);
      } catch (e) {
        console.log(`login screen error: ${e.message}`);
        setFieldValue("submitError", "Incorrect email or password");
        setTimeout(() => setFieldValue("submitError", ""), 3000);
      }
    } else if (phase === DroppablePhase.TOP) {
      setFieldValue("phase", DroppablePhase.BOTTOM);
    }
  };

    // "debug": "open 'rndebugger://set-debugger-loc?host=localhost&port=19001'"
  return (
    <Screen>
      <Logo />
      <Form
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
        includeDroppableData
      >
        <Form.Email />
        <Form.Error name="email" />

        <Form.Password />
        <Form.Error name="password" />
        <Form.Error name="submitError" />
        <Droppable useFormContext>
          <Droppable.Top>
            <Form.Password repeat />
            <Form.PasswordRemark />
            <Form.Accept name="privacyPolicy" />
            <Form.Accept name="termsAndConditions" />
          </Droppable.Top>

          <Droppable.Bottom>
            <Texts.ConfirmationCodeSent />
            <Form.Input name="confirmationCode" />
          </Droppable.Bottom>

          <Droppable.Cover>
            <Form.Button />
            <Form.Switch />
          </Droppable.Cover>
        </Droppable>
      </Form>
    </Screen>
  );
}
