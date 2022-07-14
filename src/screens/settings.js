import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Screen from "../components/basic/screen";
import Separator from "../components/basic/separator";
import Logo from "../components/dummy/logo";
import Setting from "../components/organisms/setting";
import Goal from "../components/organisms/goal";
import Meal from "../components/organisms/meal";
import { useTheme } from "../utils/themes";
import { useAuth } from "../utils/auth";
import { USER_QUERY } from "./queries/settings";
import { WithData } from "../utils/with-data";
import { useQuery } from "@apollo/client";

export const useUserQuery = () =>
  useQuery(USER_QUERY, { fetchPolicy: "network-only" });

export default function Settings() {
  return <WithData Screen={SettingsScreen} useQuery={useUserQuery} />;
}

const bgColor = (color) => ({ backgroundColor: color });

function SettingsScreen({
  data: {
    user: { email, language, currency, goals, meals },
  },
}) {
  const { settings: colors } = useTheme();
  const auth = useAuth();

  return (
    <Screen>
      <Logo noLine />
      <Separator style={[styles.separator, bgColor(colors.separator)]} />
      <ScrollView style={styles.content}>
        <Setting
          name="Account Details"
          value="(logout)"
          onPress={() => auth.logout()}
          header
        />
        <Setting name="email" value={email} />
        <Setting name="password" value={"*********"} />
        <Setting name="language" value={language} />
        <Setting name="currency" value={currency} />
        <Setting name="Legal Stuff" header />
        <Setting name="privacy policy" value="(see)" />
        <Setting name="terms of use" value="(see)" />
        <Setting name="Goals" value="(add)" color={colors.goals} header />
        {goals.map((goal) => (
          <Goal key={goal.name} {...goal} />
        ))}
        <Setting name="Meals" value="(add)" color={colors.meals} header />
        {meals.map((meal) => (
          <Meal key={meal.name} {...meal} />
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 2,
  },
  content: {
    alignSelf: "stretch",
    marginBottom: 25,
  },
});
