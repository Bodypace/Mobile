import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Screen from "../components/basic/screen";
import DatePicker from "../components/dummy/date-picker/date-picker";
import Nutrients from "../components/dummy/nutrients/nutrients";
import Items from "../components/dummy/items/items";
import { useDay } from "../utils/cache";
import { HOME_QUERY } from "./queries/home";
import { WithData } from "../utils/with-data";
import { useQuery } from "@apollo/client";

export const useHomeQuery = () => {
  const day = useDay();
  return useQuery(HOME_QUERY, {
    variables: { day },
  });
};

export default function Home() {
  return <WithData Screen={HomeScreen} useQuery={useHomeQuery} />;
}

function HomeScreen({
  data: {
    home: { inventory, shoppingList, wasted, goal, mealTimes },
  },
}) {
  return (
    <Screen>
      <DatePicker />
      <ScrollView style={styles.content}>
        <Items name="In Home" remark="13 PLN" eats={inventory} />
        <Items name="Shopping List" remark="13 PLN" eats={shoppingList} />
        <Items name="Wasted" remark="13 PLN" eats={wasted} />
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
