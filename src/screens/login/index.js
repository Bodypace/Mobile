import React, { useState, useEffect, useRef } from "react";
import { Keyboard, Text, View, StyleSheet, Pressable } from "react-native";
import { Screen } from "../../components/atoms";
import { Logo } from "../../components/molecules";
import { useAuth } from "../../utils/auth";
import Button from "./button";
import { useTheme } from "../../utils/themes";
import TrackLayout from "./track-layout";
import AnimatedText from "./animations/animated-text";
import ConfirmButton from "./animations/confirm-button";
import ConfirmCode from "./animations/confirm-code";
import * as Yup from "yup";
import { values } from "lodash";
import Form from "./form";
import FormSwitch from "./form-switch";
import LoginPhase from "./login-phase";
import Droppable from "./droppable";
import Texts from './texts';

export default function Login() {
  const auth = useAuth();
  const { general: colors } = useTheme();

  const [phase, setPhase] = useState(LoginPhase.LOGIN);

  const blockHeight = useRef(0);
  const registerHeight = useRef(0);

  const [loginErrorVisible, setLoginErrorVisible] = useState(false);
  const [confirmButtonElevated, setConfirmButtonElevated] = useState(true);
  const [confirmCodeVisible, setConfirmCodeVisible] = useState(false);

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

  const onSubmit = async ({ email, password }) => {
    if (phase === LoginPhase.LOGIN) {
      try {
        await auth.login(email, password);
      } catch (e) {
        console.log(`login screen error: ${e.message}`);
        setLoginErrorVisible(true);
        setTimeout(() => setLoginErrorVisible(false), 3000);
      }
    } else if (phase === LoginPhase.REGISTER) {
      setPhase(LoginPhase.CONFIRM_CODE);
    } else {
      // setPassword(LoginPhase.LOGIN);
    }
  };

  return (
    <Screen>
      <Logo />
      <Form
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        <Form.Email />
        <Form.Error name="email" />
        <Form.Password />
        <Form.Error name="password" />
        <Form.Error name="submitError" />
        <Droppable>
          <Droppable.Beneath>
            <Form.Password repeat />
            <Form.PasswordRemark />
            <Form.Accept name="privacyPolicy" />
            <Form.Accept name="termsAndConditions" />
          </Droppable.Beneath>
          <Droppable.Bottom>
            <Texts.ConfirmationCodeSent/>
            <Form.Input name="confirmationCode" />
          </Droppable.Bottom>
          <Droppable.Falling>
            <Button phase={phase} />
            <FormSwitch phase={phase} setPhase={setPhase} />
          </Droppable.Falling>
        </Droppable>
      </Form>
    </Screen>
  );
}
        // <AnimatedText
        //   style={{ color: colors.error, marginLeft: 10 }}
        //   animated="height"
        //   hide={0}
        //   show={20}
        //   visible={loginErrorVisible}
        // >
        //   Incorrect email or password
        // </AnimatedText>

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignSelf: "stretch",
  },
  passwordRemark: {
    marginLeft: 25,
    marginBottom: 10,
  },
  goBack: {
    color: "darkgreen",
    borderBottomWidth: 1,
    borderColor: "darkgreen",
  },
});
