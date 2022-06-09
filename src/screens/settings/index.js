import React from 'react'
import { ScrollView, StyleSheet } from 'react-native';
import { Screen, Separator } from '../../components/atoms'
import { Logo } from '../../components/molecules';
import { Setting, Goal, Meal } from './items'
import { useTheme } from '../../utils/themes'
import { useAuth } from '../../utils/auth'
import { USER_QUERY } from './graph';
import { WithData } from '../../utils/with-data';
import { useQuery } from "@apollo/client";


export default function Settings() {
  const useUserQuery = () => useQuery(
    USER_QUERY,
    { fetchPolicy: "network-only" }
  );

  return (
    <WithData Screen={SettingsScreen} useQuery={useUserQuery} />
  )
}

const bgColor = color => ({ backgroundColor: color })

function SettingsScreen({ data: { user: { email, language, currency, goals, meals } } }) {
  const { settings: colors } = useTheme()
  const auth = useAuth()

  return (
    <Screen>
      <Logo noLine />
      <Separator style={[styles.separator, bgColor(colors.separator)]} />
      <ScrollView style={styles.content}>
        <Setting name="Account Details" value="(logout)" onPress={() => auth.logout()} header />
        <Setting name="email" value={email} />
        <Setting name="password" value={"*********"} />
        <Setting name="language" value={language} />
        <Setting name="currency" value={currency} />
        <Setting name="Legal Stuff" header />
        <Setting name="privacy policy" value="(see)" />
        <Setting name="terms of use" value="(see)" />
        <Setting name="Goals" value="(add)" color={colors.goals} header />
        {goals.map(goal =>
          <Goal key={goal.name} {...goal} />)
        }
        <Setting name="Meals" value="(add)" color={colors.meals} header />
        {meals.map(meal =>
          <Meal key={meal.name} {...meal} />)
        }
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 2,
  },
  content: {
    alignSelf: 'stretch',
    marginBottom: 25,
  },
})