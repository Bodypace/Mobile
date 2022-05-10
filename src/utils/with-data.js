import React, { useEffect } from "react"
import { Text } from "react-native"
import { useAuth } from "./auth"


export function WithData({ Screen, useQuery }) {
  const auth = useAuth()
  const { loading, error, data } = useQuery()

  useEffect(() => {
    if (error && error.message.startsWith('401: Unauthorized')) {
      auth.onAutoLogout()
    }
  }, [error])

  if (loading) {
    return <Text>Loading ...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return <Screen data={data} />
}