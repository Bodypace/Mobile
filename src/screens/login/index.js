import React from "react";
import { StyleSheet } from "react-native";
import { Screen } from "../../components/atoms";
import { Logo } from "../../components/molecules";
import { useAuth } from "../../utils/auth";
import * as Yup from "yup";
import Form from "./form";
import Droppable from "./droppable";
import { DroppablePhase } from "./droppable/droppable";
import Texts from "./texts/texts";
import GreyBackground from "./grey-background";

export default function Login() {
  const auth = useAuth();

  const schema = Yup.object().shape({
    phase: Yup.number().optional(),
    email: Yup.string().email("Incorrect email").required("Required"),
    password: Yup.string().min(8, "At least 8 characters").required("Required"),
    passwordRepeat: Yup.string().when("phase", {
      is: (v) => v !== DroppablePhase.COVER,
      then: (schema) =>
        schema
          .oneOf([Yup.ref("password"), null], "Passwords don't match")
          .required("Required"),
      otherwise: (schema) => schema.optional(),
    }),
    privacyPolicy: Yup.bool().when("phase", {
      is: (v) => v !== DroppablePhase.COVER,
      then: (schema) => schema.oneOf([true], "Must accept"),
      otherwise: (schema) => schema.optional(),
    }),
    termsAndConditions: Yup.bool().when("phase", {
      is: (v) => v !== DroppablePhase.COVER,
      then: (schema) => schema.oneOf([true], "Must accept"),
      otherwise: (schema) => schema.optional(),
    }),
    confirmationCode: Yup.string().when("phase", {
      is: DroppablePhase.BOTTOM,
      then: (schema) =>
        schema.min(6, "6 digits").max(6, "6 digits").required("Required"),
      otherwise: (schema) => schema.optional(),
    }),
  });

  const initialValues = {
    phase: DroppablePhase.COVER,
    email: "",
    password: "",
    passwordRepeat: "",
    privacyPolicy: false,
    termsAndConditions: false,
    confirmationCode: "",
    submitError: "",
  };

  const onSubmit = async (
    { phase, email, password, confirmationCode },
    { setFieldValue, setFieldError }
  ) => {
    const showError = (msg) => {
      setFieldError("submitError", msg);
      setTimeout(() => setFieldError("submitError", ""), 3000);
    };

    console.log("on submit: ");
    try {
      if (phase === DroppablePhase.COVER) {
        await auth.login(email, password);
      } else if (phase === DroppablePhase.BOTTOM) {
        const { success } = await auth.register(
          email,
          password,
          confirmationCode
        );
        if (success) {
          await auth.login(email, password);
        } else {
          showError("Incorrect confirmation code");
        }
      } else if (phase === DroppablePhase.TOP) {
        await auth.getRegisterCode(email, password);
        setFieldValue("phase", DroppablePhase.BOTTOM);
      }
    } catch (e) {
      showError("Incorrect email or password");
    }
  };

  const onSendNewCode = ({ values: { email, password } }) =>
    auth.getRegisterCode(email, password);

  const onGoBack = ({ setFieldValue }) =>
    setFieldValue("phase", DroppablePhase.TOP);

  return (
    <Screen style={styles.screen}>
      <Logo style={styles.logo} />
      <Form
        validationSchema={schema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <GreyBackground top>
          <Form.Email />
          <Form.Password />
        </GreyBackground>

        <Droppable useFormContext>
          <Droppable.Top>
            <GreyBackground bottom>
              <Form.Password repeat />
              <Form.Accept name="privacyPolicy" />
              <Form.Accept name="termsAndConditions" />
            </GreyBackground>
          </Droppable.Top>

          <Droppable.Bottom>
            <Texts.ConfirmationCodeSent />
            <Form.Input name="confirmationCode" />
            <Texts.ResendOrGoBack
              onSendNewCode={onSendNewCode}
              onGoBack={onGoBack}
            />
          </Droppable.Bottom>

          <Droppable.Cover>
            <Form.Error name="submitError" />
            <Form.Button />
            <Form.Switch />
          </Droppable.Cover>
        </Droppable>
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 15,
  },
  logo: {
    marginBottom: 20,
  },
});
