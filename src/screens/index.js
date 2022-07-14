import React, { useEffect } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./login";
import Diet from "./diet";
import Home from "./home";
import Settings from "./settings";
import { useAuth } from "../utils/auth";
import { USER_QUERY } from "./queries/settings";
import Splash from "./splash";
import { useQuery } from "@apollo/client";
import Icon from "../components/basic/icon";

const LoginScreen = () => {
  const auth = useAuth();
  const { loading, error, data } = useQuery(USER_QUERY, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      auth.onAutoLogin();
    }
  }, [data]);

  if (loading) {
    return <Splash />;
  }

  if (error && error.message.startsWith("401: Unauthorized")) {
    return <Login />;
  }

  // TODO on 404 logout? (when user was deleted and thus token is refering to not existing user)
  // TODO: will it be exploitable when token is held but user gets deleted and new one created with matching id?

  if (error) {
    return <Text>login screen error: {error.message}</Text>;
  }

  return <></>;
};

export default function Screens({ navigator, isLoggedIn }) {
  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <NavigationContainer>
      <navigator.Navigator
        initialRouteName="Diet"
        barStyle={{
          backgroundColor: "darkgreen",
        }}
      >
        <navigator.Screen
          name="Diet"
          component={Diet}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon focused={focused} name="today" />
            ),
          }}
        />
        <navigator.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => <Icon focused={focused} name="home" />,
          }}
        />
        <navigator.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon focused={focused} name="settings" />
            ),
          }}
        />
      </navigator.Navigator>
    </NavigationContainer>
  );
}
