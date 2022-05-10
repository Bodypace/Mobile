import React, { useEffect } from 'react'
import { Text, ScrollView, StyleSheet } from 'react-native'
import { Screen } from '../../bricks'
import { DatePicker, Nutrients, Items } from '../../components'
import { useAuth } from '../../utils/auth'
import { useDay } from '../../utils/cache'
import { useHomeQuery } from './graph';


export default function Home() {
  const auth = useAuth()
  const day = useDay()
  const { loading, error, data } = useHomeQuery(day)

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

  const { inventory, shoppingList, wasted, goal, mealTimes } = data.home

  return (
    <Screen>
      <DatePicker/>
      <ScrollView style={styles.content}>
        <Items
          name="In Home"
          remark="13 PLN"
          eats={inventory}
        />
        <Items
          name="Shopping List"
          remark="13 PLN"
          eats={shoppingList}
        />
        <Items
          name="Wasted"
          remark="13 PLN"
          eats={wasted}
        />
      </ScrollView>
      <Nutrients
        style={styles.summary}
        fields={['kcal', 'protein', 'carb', 'fat', 'salt']}
        items={mealTimes}
        goal={goal}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    alignSelf: 'stretch'
  },
  summary: {
    backgroundColor: '#e1e1e1',
    borderTopWidth: 1,
    borderColor: 'darkgreen',
  },
})