import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Screen } from '../../components/atoms'
import { DatePicker, Nutrients, Items } from '../../components/molecules'
import { useDay } from '../../utils/cache'
import { HOME_QUERY } from './graph';
import { WithData } from '../../utils/with-data'
import { useQuery } from "@apollo/client";


export default function Home() {
  const day = useDay()
  const useHomeQuery = () => useQuery(
    HOME_QUERY,
    {
      variables: { day },
      // fetchPolicy: "network-only"
    }
  );

  return (
    <WithData Screen={HomeScreen} useQuery={useHomeQuery} />
  )
}

function HomeScreen({ data: { home: { inventory, shoppingList, wasted, goal, mealTimes } } }) {
  return (
    <Screen>
      <DatePicker />
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