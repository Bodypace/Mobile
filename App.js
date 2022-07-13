import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { ProvideAuth } from "./src/utils/auth";
import { ProvideThemes } from "./src/utils/themes";
import { WithFonts } from "./src/utils/fonts";
import { ProvideClient } from "./src/utils/client";
import Screens from "./src/screens";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <WithFonts>
      <ProvideClient>
        <ProvideAuth setIsLoggedIn={setIsLoggedIn}>
          <ProvideThemes>
            <Screens navigator={Tab} isLoggedIn={isLoggedIn} />
            <StatusBar style="auto" />
          </ProvideThemes>
        </ProvideAuth>
      </ProvideClient>
    </WithFonts>
  );
}
