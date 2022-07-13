import React, { useEffect } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Login from "./login";
import Diet from "./diet";
import Home from "./home";
import Settings from "./settings";
import { useAuth } from "../utils/auth";
import { USER_QUERY } from "./settings/graph";
import Splash from "./login/splash";
import { useQuery } from "@apollo/client";

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

  if (error) {
    return <Text>login screen error: {error.message}</Text>;
  }

  return <></>;
};

const Icon = ({ focused, name }) => {
  const iconName = focused ? `md-${name}` : `md-${name}-outline`;
  return <Ionicons name={iconName} size={20} color="black" />;
};

export default function AppScreen({ Tab, isLoggedIn }) {
  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Diet"
        barStyle={{
          backgroundColor: "darkgreen",
        }}
      >
        <Tab.Screen
          name="Diet"
          component={Diet}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon focused={focused} name="today" />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => <Icon focused={focused} name="home" />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon focused={focused} name="settings" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
