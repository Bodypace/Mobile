import React, { useEffect } from 'react'
import { Text, ScrollView, StyleSheet } from 'react-native';
import { Screen, Separator } from '../../bricks'
import { Logo } from '../../components';
import { Setting, Goal, Meal } from './items'
import { useTheme } from '../../utils/themes'
import { useAuth } from '../../utils/auth'
import { useUserQuery } from './graph';


export default function Settings() {
  const auth = useAuth()
  const { loading, error, data } = useUserQuery()

  useEffect(() => {
    if (error && error.message.startsWith('401: Unauthorized')) {
      auth.onAutoLogout()
    }
  }, [error])

  if (loading) {
    return <Text>Profile Loading ...</Text>;
  }

  if (error) {
    return <Text>Profile Error: {error.message}</Text>;
  }

  return <SettingsScreen data={data} />
}


const bgColor = color => ({ backgroundColor: color })


function SettingsScreen({ data: {user: { email, language, currency, goals, meals } }}) {
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