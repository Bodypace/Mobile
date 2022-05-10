import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Login, Diet, Home, Settings } from './src/screens';
import { ProvideAuth } from './src/utils/auth';
import { ProvideThemes } from './src/utils/themes';
import { WithFonts } from './src/utils/fonts';
import { ProvideClient } from './src/utils/client';


const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const Icon = ({ focused, name }) => {
    const iconName = focused ? `md-${name}` : `md-${name}-outline`
    return <Ionicons name={iconName} size={20} color="black" />
  }

  return (
    <WithFonts>
      <ProvideClient>
        <ProvideAuth setIsLoggedIn={setIsLoggedIn}>
          <ProvideThemes>
            {isLoggedIn ?
              <NavigationContainer>
                <Tab.Navigator initialRouteName='Diet' barStyle={{
                  backgroundColor: 'darkgreen'
                }}>
                  <Tab.Screen name="Diet" component={Diet} options={{
                    tabBarIcon: ({ focused }) => <Icon focused={focused} name="today" />
                  }} />
                  <Tab.Screen name="Home" component={Home} options={{
                    tabBarIcon: ({ focused }) => <Icon focused={focused} name="home" />
                  }} />
                  <Tab.Screen name="Settings" component={Settings} options={{
                    tabBarIcon: ({ focused }) => <Icon focused={focused} name="settings" />
                  }} />
                </Tab.Navigator>
              </NavigationContainer> :
              <Login onAutoLogin={() => setIsLoggedIn(true)} />
            }
            <StatusBar style="auto" />
          </ProvideThemes>
        </ProvideAuth>
      </ProvideClient>
    </WithFonts>
  )
}
