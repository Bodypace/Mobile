import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import Screen from "../components/basic/screen";
import DatePicker from "../components/dummy/date-picker/date-picker";
import Nutrients from "../components/dummy/nutrients/nutrients";
import Items from "../components/dummy/items/items";
import Water from "../components/dummy/water";
import { useDay } from "../utils/cache";
import { DIET_QUERY } from "./queries/diet";
import { WithData } from "../utils/with-data";
import { useQuery } from "@apollo/client";

export const useDietQuery = () => {
  const day = useDay();
  return useQuery(DIET_QUERY, {
    variables: { day },
    // fetchPolicy: "network-only"
  });
};

export default function Diet() {
  return <WithData Screen={DietScreen} useQuery={useDietQuery} />;
}

export function DietScreen({
  data: {
    diet: { goal, water, mealTimes },
  },
}) {
  return (
    <Screen>
      <DatePicker />
      <ScrollView style={styles.content}>
        <Water water={water} goal={goal} />
        {mealTimes.map(({ hour, meal: { name }, eats }) => (
          <Items key={name} {...{ name, hour, eats }} remark="13 PLN" />
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
