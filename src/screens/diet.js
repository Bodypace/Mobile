import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Screen from "../components/atoms/screen";
import DatePicker from "../components/molecules/date-picker/date-picker";
import Nutrients from "../components/molecules/nutrients/nutrients";
import Items from "../components/molecules/items/items";
import Water from "../components/molecules/water";
import { useDay } from "../utils/cache";
import { DIET_QUERY } from "./queries/diet";
import { WithData } from "../utils/with-data";
import { useQuery } from "@apollo/client";

export default function Diet() {
  const day = useDay();
  const useDietQuery = () =>
    useQuery(DIET_QUERY, {
      variables: { day },
      // fetchPolicy: "network-only"
    });

  return <WithData Screen={DietScreen} useQuery={useDietQuery} />;
}

function DietScreen({
  data: {
    diet: { goal, water, mealTimes },
  },
}) {
  return (
    <Screen>
      <DatePicker />
      <ScrollView style={styles.content}>
        <Water water={water} goal={goal} />
        {mealTimes.map(({ hour, meal, eats }) => (
          <Items
            key={meal.name}
            hour={hour}
            name={meal.name}
            remark="13 PLN"
            eats={eats}
          />
        ))}
      </ScrollView>
      <Nutrients
        style={styles.summary}
        fields={["kcal", "protein", "carb", "fat", "salt"]}
        items={mealTimes}
        goal={goal}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    alignSelf: "stretch",
  },
  summary: {
    backgroundColor: "#e1e1e1",
    borderTopWidth: 1,
    borderColor: "darkgreen",
  },
});
