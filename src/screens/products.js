import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Separator from "../components/basic/separator";
import Screen from "../components/basic/screen";
import Nutrients from "../components/dummy/nutrients/nutrients";
import ItemButton from "../components/dummy/items/item-button";
import Product from "../components/organisms/product";
import { PRODUCTS_QUERY } from "./queries/products";
import { WithData } from "../utils/with-data";
import { useQuery } from "@apollo/client";
import Selector from "../components/organisms/selector";
import Search from "../components/organisms/search";

export default function Products() {
  return (
    <WithData
      Screen={ProductsScreen}
      useQuery={() => useQuery(PRODUCTS_QUERY)}
    />
  );
}

function ProductsScreen({ data: { products } }) {
  const options = ["Adding", "Recent", "Products", "In Home", "Favorites"];
  const [option, setOption] = useState("Products");

  return (
    <Screen>
      <Text style={styles.title}>Today (2022-05-10)</Text>
      <Text style={styles.title}>add more {">"} Breakfast</Text>
      <Nutrients
        fields={[
          "kcal",
          "protein",
          "carb",
          "sugar",
          "fat",
          "saturated",
          "salt",
        ]}
        items={[]}
        hideTitle
      />
      <Separator style={styles.topSeparator} />
      <Selector options={options} selected={option} onSetSelected={setOption} />
      <Search />
      <Separator style={styles.separator} />
      <ScrollView style={styles.scroll}>
        {products.map((product) => (
          <Product key={product.id} item={product} />
        ))}
      </ScrollView>
      <Nutrients
        style={styles.summary}
        fields={["kcal", "protein", "carb", "fat", "salt"]}
        items={[]}
      />
      <View style={styles.buttons}>
        <ItemButton name="Save" onPress={() => undefined} />
        <ItemButton name="New Product" onPress={() => undefined} />
        <ItemButton name="Dismiss" onPress={() => undefined} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    alignSelf: "stretch",
  },
  title: {
    textAlign: "center",
    marginVertical: 5,
    fontSize: 18,
  },
  topSeparator: {
    backgroundColor: "darkgreen",
    height: 2,
  },
  separator: {
    backgroundColor: "darkgreen",
  },
  summary: {
    backgroundColor: "#e1e1e1",
    borderTopWidth: 1,
    borderColor: "darkgreen",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "darkgreen",
  },
});
