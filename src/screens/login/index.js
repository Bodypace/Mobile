import React, { useState, useEffect, useRef } from "react";
import { Keyboard, Text, View, StyleSheet, Pressable } from "react-native"
import { Screen } from "../../bricks";
import { Logo } from "../../components";
import { useAuth } from '../../utils/auth'
import Button from "./button";
import Input from "./input";
import Check from "./check";
import { useTheme } from "../../utils/themes";
import TrackLayout from "./track-layout";
import AnimatedText from "./animations/animated-text";
import ConfirmButton from "./animations/confirm-button";
import ConfirmCode from "./animations/confirm-code";


const LoginPhase = Object.freeze({
  LOGIN: 1,
  REGISTER: 2,
  CONFIRM_CODE: 3,
})

export default function Login() {
  const auth = useAuth()
  const { general: colors } = useTheme()

  const [phase, setPhase] = useState(LoginPhase.LOGIN)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [confirmCode, setConfirmCode] = useState("")
  const [privacyPolicy, setPrivacyPolicy] = useState(false)
  const [termsAndConditions, setTermsAndConditions] = useState(false)

  const blockHeight = useRef(0)
  const registerHeight = useRef(0)

  const [loginErrorVisible, setLoginErrorVisible] = useState(false)
  const [confirmButtonElevated, setConfirmButtonElevated] = useState(true)
  const [confirmCodeVisible, setConfirmCodeVisible] = useState(false)

  useEffect(() => {
    if (phase === LoginPhase.LOGIN) {
      setConfirmButtonElevated(true)
      setConfirmCodeVisible(false)
    }
    else if (phase === LoginPhase.REGISTER) {
      setRepeatPassword("")
      setConfirmCode("")
      setPrivacyPolicy(false)
      setTermsAndConditions(false)
      setConfirmButtonElevated(false)

      setConfirmCodeVisible(false)
    }
    else { // phase === LoginPhase.CONFIRM_CODE
      setConfirmCode("")
      setConfirmCodeVisible(true)
    }
  }, [phase])

  const onConfirm = async () => {
    if (phase === LoginPhase.LOGIN) {
      try {
        await auth.login(email, password)
      }
      catch (e) {
        console.log(`login screen error: ${e.message}`)
        setLoginErrorVisible(true)
        setTimeout(() => setLoginErrorVisible(false), 3000)
      }
    }
    else if (phase === LoginPhase.REGISTER) {
      setPhase(LoginPhase.CONFIRM_CODE)

    }
    else {
      setPassword(LoginPhase.LOGIN)
    }
  }

  const passwordsMatch = password === repeatPassword

  return (
    <Screen>
      <Logo />
      <Input placeholder="email" text={email} setText={setEmail} />
      <Input placeholder="password" text={password} setText={setPassword} secure />
      <AnimatedText style={{ color: colors.error, marginLeft: 10 }} animated="height" hide={0} show={20} visible={loginErrorVisible}>
        Incorrect email or password
      </AnimatedText>
      <TrackLayout style={styles.block} value="height" store={blockHeight}>
        <TrackLayout value="height" store={registerHeight}>
          <Input placeholder="repeat password" text={repeatPassword} setText={setRepeatPassword} secure error={password !== "" && !passwordsMatch} />
          {password !== "" &&
            <Text style={[styles.passwordRemark, { color: passwordsMatch ? colors.good : colors.error }]}>
              {passwordsMatch ? "passwords match" : "enter the same password twice"}
            </Text>}
          <Check text="I accept" link="privacy policy" checked={privacyPolicy} setChecked={setPrivacyPolicy} />
          <Check text="I accept" link="terms and conditions" checked={termsAndConditions} setChecked={setTermsAndConditions} />
        </TrackLayout>
        <ConfirmCode blockHeight={blockHeight} registerHeight={registerHeight} visible={confirmCodeVisible}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 15 }}>
            <Text style={{ color: "grey" }}>we sent confirmation code to your email</Text>
            <Pressable onPress={() => setPhase(LoginPhase.REGISTER)}>
              <Text style={{ color: "darkgreen", borderBottomWidth: 1, borderColor: "darkgreen" }}>go back</Text>
            </Pressable>
          </View>
          <Input placeholder="confirmation code" text={confirmCode} setText={setConfirmCode} />
        </ConfirmCode>
        <ConfirmButton blockHeight={blockHeight} elevated={confirmButtonElevated}>
          <Button
            text={phase === LoginPhase.LOGIN ? "Login" : "Register"}
            onPress={onConfirm}
            disabled={email === "" || password === "" ||
              (phase !== LoginPhase.LOGIN && (!passwordsMatch || !privacyPolicy || !termsAndConditions)) ||
              (phase === LoginPhase.CONFIRM_CODE && (confirmCode === ""))
            }
          />
          <Check
            text={phase === LoginPhase.LOGIN ? "Don't have an account?" : "Already have an account?"}
            link={phase === LoginPhase.LOGIN ? "Register with email" : "Login instead"}
            onPress={() => {
              Keyboard.dismiss()
              setPhase(phase === LoginPhase.LOGIN ? LoginPhase.REGISTER : LoginPhase.LOGIN)
            }}
          />
        </ConfirmButton>
      </TrackLayout>
    </Screen >
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignSelf: 'stretch',
  },
  passwordRemark: {
    marginLeft: 25,
    marginBottom: 10,
  }
})