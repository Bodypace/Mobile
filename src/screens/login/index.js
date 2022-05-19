import React, { useState, useEffect, useRef } from "react";
import { Keyboard, Animated, Text, View, StyleSheet, Pressable } from "react-native"
import { Screen } from "../../bricks";
import { Logo } from "../../components";
import { useAuth } from '../../utils/auth'
import { USER_QUERY } from "../settings/graph";
import Splash from './splash'
import { useQuery } from "@apollo/client";
import Button from "./button";
import Input from "./input";
import Check from "./check";
import { useTheme } from "../../utils/themes";


const LoginPhase = Object.freeze({
  LOGIN: 1,
  REGISTER: 2,
  CONFIRM_CODE: 3,
})

export default function Login() {
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
  const confirmButtonHeight = useRef(0)
  const confirmCodeHeight = useRef(0)

  const confirmButtonBottomMargin = 5
  const confirmButtonAnim = useRef(new Animated.Value(0)).current;
  const confirmButtonPaddingAnim = useRef(new Animated.Value(10)).current;
  const loginErrorAnim = useRef(new Animated.Value(0)).current;

  const showLoginError = () => {
    Animated.timing(loginErrorAnim, {
      toValue: 20,
      duration: 250,
      useNativeDriver: false,
    }).start()
  }
  const hideLoginError = () => {
    Animated.timing(loginErrorAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start()
  }

  const lowerConfirmButton = () => {
    setRepeatPassword("")
    setConfirmCode("")
    setPrivacyPolicy(false)
    setTermsAndConditions(false)
    let toValue = blockHeight.current - confirmButtonHeight.current - confirmButtonBottomMargin
    if (toValue < 0) toValue = 0
    Animated.sequence([
      Animated.timing(confirmButtonAnim, {
        toValue,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(confirmButtonPaddingAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      })
    ]).start();
  };
  const elevateConfirmButton = () => {
    Animated.parallel([
      Animated.timing(confirmButtonAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(confirmButtonPaddingAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: false,
      })
    ]).start();
  };

  const confirmCodeAnim = useRef(new Animated.Value(2000)).current;
  const showConfirmCode = () => {
    setConfirmCode("")
    let toValue = blockHeight.current - confirmButtonHeight.current - 25 - confirmCodeHeight.current
    Animated.timing(confirmCodeAnim, {
      toValue: registerHeight.current,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };
  const hideConfirmCode = () => {
    const toValue = blockHeight.current || 1000
    Animated.timing(confirmCodeAnim, {
      toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (phase === LoginPhase.LOGIN) {
      elevateConfirmButton()
      hideConfirmCode()
    }
    else if (phase === LoginPhase.REGISTER) {
      lowerConfirmButton()
      hideConfirmCode()
    }
    else { // CONFIRM_CODE
      showConfirmCode()
    }
  }, [phase])

  const auth = useAuth()
  const { loading, error, data } = useQuery(
    USER_QUERY,
    { fetchPolicy: "network-only" }
  );

  useEffect(() => { if (data) auth.onAutoLogin() }, [data])

  if (loading) {
    return <Splash />
  }

  const logMeIn = async () => {
    try {
      await auth.login(email, password)
    }
    catch (e) {
      console.log(`login screen error: ${e.message}`)
      showLoginError()
      setTimeout(() => hideLoginError(), 3000)
    }
  }

  const heightSetter = target => event => {
    target.current = event.nativeEvent.layout.height
  }

  const passwordsMatch = password === repeatPassword

  if (error && error.message.startsWith('401: Unauthorized')) {
    return (
      <Screen>
        <Logo />
        <Input placeholder="email" text={email} setText={setEmail} />
        <Input placeholder="password" text={password} setText={setPassword} secure />
        <Animated.Text style={{ height: loginErrorAnim, color: colors.error, marginLeft: 10 }}>Incorrect email or password</Animated.Text>
        <View style={styles.block} onLayout={heightSetter(blockHeight)}>
          <View onLayout={heightSetter(registerHeight)}>
            <Input placeholder="repeat password" text={repeatPassword} setText={setRepeatPassword} secure error={password !== "" && !passwordsMatch} />
            {password !== "" &&
              <Text style={[styles.passwordRemark, { color: passwordsMatch ? colors.good : colors.error }]}>
                {passwordsMatch ? "passwords match" : "enter the same password twice"}
              </Text>}
            <Check text="I accept" link="privacy policy" checked={privacyPolicy} setChecked={setPrivacyPolicy} />
            <Check text="I accept" link="terms and conditions" checked={termsAndConditions} setChecked={setTermsAndConditions} />
          </View>
          <Animated.View style={[styles.confirmCode, { marginTop: confirmCodeAnim }]}>
            <View onLayout={heightSetter(confirmCodeHeight)}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 15 }}>
                <Text style={{ color: "grey" }}>we sent confirmation code to your email</Text>
                <Pressable onPress={() => setPhase(LoginPhase.REGISTER)}>
                  <Text style={{ color: "darkgreen", borderBottomWidth: 1, borderColor: "darkgreen" }}>go back</Text>
                </Pressable>
              </View>
              <Input placeholder="confirmation code" text={confirmCode} setText={setConfirmCode} />
            </View>
          </Animated.View>
          <Animated.View style={[styles.confirmButton, { marginTop: confirmButtonAnim, paddingTop: confirmButtonPaddingAnim }]} >
            <View onLayout={heightSetter(confirmButtonHeight)}>
              <Button
                text={phase === LoginPhase.LOGIN ? "Login" : "Register"}
                onPress={
                  phase === LoginPhase.LOGIN ? logMeIn :
                    phase === LoginPhase.REGISTER ? () => setPhase(LoginPhase.CONFIRM_CODE) :
                      () => setPhase(LoginPhase.LOGIN)
                }
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
            </View>
          </Animated.View>
        </View>
      </Screen >
    )
  }

  return <></>
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignSelf: 'stretch',
  },
  confirmCode: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  confirmButton: {
    position: "absolute",
    zIndex: 2,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  passwordRemark: {
    marginLeft: 25,
    marginBottom: 10,
  }
})