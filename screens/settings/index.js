import React, { useEffect } from 'react'
import { Text, ScrollView, StyleSheet } from 'react-native';
import { Screen, Separator } from '../../bricks'
import { SimpleItem, GoalItem, MealItem, Logo } from '../../components';
import { useTheme } from '../../utils/themes'
import { useAuth } from '../../utils/auth'
import { useUserQuery } from './graph';


export default function Settings() {
  const { settings: colors } = useTheme()
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

  const { email, language, currency, goals, meals } = data.user

  const sections = [
    {
      name: 'Account Details',
      value: '(logout)',
      onPress: () => auth.logout(),
      ItemComponent: SimpleItem,
      items: [
        { name: 'email', value: email },
        { name: 'password', value: '*********' },
        { name: 'language', value: language },
        { name: 'currency', value: currency },
      ],
    },
    {
      name: 'Legal Stuff',
      ItemComponent: SimpleItem,
      items: [
        { name: 'privacy policy', value: '(see)' },
        { name: 'terms of use', value: '(see)' },
      ]
    },
    {
      name: "Goals",
      value: "(add)",
      color: colors.goals,
      ItemComponent: GoalItem,
      items: goals,
    },
    {
      name: "Meals",
      value: "(add)",
      color: colors.meals,
      ItemComponent: MealItem,
      items: meals,
    }
  ]

  const separatorColor = {
    backgroundColor: colors.separator
  }

  return (
    <Screen>
      <Logo noLine />
      <Separator style={[styles.separator, separatorColor]} />
      <ScrollView style={styles.content}>
        {sections.map(({ name, value, onPress, color, ItemComponent, items }) =>
          <React.Fragment key={name}>
            <SimpleItem isHeader name={name} value={value} onPress={onPress} color={color} />
            {items ? items.map(props => <ItemComponent key={props.name} {...props} />) : <></>}
          </React.Fragment>
        )}
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