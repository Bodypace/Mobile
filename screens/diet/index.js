import React, { useEffect } from 'react'
import { Text, ScrollView, StyleSheet } from 'react-native'
import { Screen } from '../../bricks'
import { DatePicker, Nutrients, Items, Water } from '../../components'
import { useAuth } from '../../utils/auth'
import { useDay } from '../../utils/cache'
import { useDietQuery } from './graph';


export default function Diet() {
  const auth = useAuth()
  const day = useDay()
  const { loading, error, data } = useDietQuery(day)

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

  const { goal, water, mealTimes } = data.diet

  return (
    <Screen>
      <DatePicker style={styles.datePicker}/>
      <ScrollView style={styles.content}>
        <Water water={water} goal={goal}/>
        {mealTimes.map(({ hour, meal, eats }) =>
          <Items
            key={meal.name}
            hour={hour}
            name={meal.name}
            remark="13 PLN"
            eats={eats}
          />
        )}
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
  datePicker: {
    // marginBottom: 25,
  },
  summary: {
    backgroundColor: '#e1e1e1',
    borderTopWidth: 1,
    borderColor: 'darkgreen',
  },
})
