import React, { useState, useEffect } from "react";
import { Pressable, Text, StyleSheet } from "react-native"
import { Screen } from "../../bricks";
import { Logo } from "../../components";
import { useAuth } from '../../utils/auth'
import { useUserQuery } from "../settings/graph";
import Splash from './splash'


export default function Login() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const auth = useAuth()
  const { loading, error, data } = useUserQuery()

  useEffect(() => {
    if (data) {
      auth.onAutoLogin()
    }
  }, [data])

  if (loading) {
    return <Splash />
  }

  if (error && error.message.startsWith('401: Unauthorized')) {
    return (
      <Screen>
        <Logo />
        <Pressable onPress={() => auth.login("rdorna8@gmail.com", "password")}>
          <Text style={styles.text}>
            Login screen
          </Text>
        </Pressable>
      </Screen>
    )
  }

  return <></>
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  }
})