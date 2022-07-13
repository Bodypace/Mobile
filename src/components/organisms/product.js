import React from "react";
import { StyleSheet } from "react-native";
import Item from "../molecules/items/item";
import { define as title } from "../../modals/edit/elements/title";
import { define as separator } from "../../modals/edit/elements/separator";
import { readProductFields, readPrice } from "../../utils/readers";
import { selectedProductId } from "../../utils/cache";
import { gql, useApolloClient } from "@apollo/client";

const EAT_MUTATION = gql`
  mutation PatchEat($id: ID!, $data: EatPatch!) {
    patchEat(id: $id, data: $data) {
      success
      eat {
        id
        amount
      }
    }
  }
`;

export default function Product({ item }) {
  const client = useApolloClient();

  const edit = {
    name: "Edit",
    layout: [title, separator],
    action: (id, data) =>
      client.mutate({
        mutation: EAT_MUTATION,
        variables: { id, data },
      }),
  };

  const remove = {
    name: "Remove",
    layout: [title, separator],
  };

  const [name, vendor] = readProductFields(item, ["name", "vendor"]);
  const price = readPrice(item);

  return (
    <Item
      styles={styles}
      name={name}
      remark={price && `${price} PLN`}
      leftValue={vendor}
      rightValue={`${item.amount} g`}
      showSeparator
      nutrientsToShow={[
        "kcal",
        "protein",
        "carb",
        "sugar",
        "fat",
        "saturated",
        "salt",
      ]}
      item={item}
      overlays={[edit, remove]}
      setSelectedId={selectedProductId}
    />
  );
}

export const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
    paddingBottom: 25,
  },
  selectedContainer: {
    backgroundColor: "#E5FCDD",
    paddingBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  remark: {
    paddingTop: 2,
    color: "grey",
    fontSize: 14,
  },
  leftValue: {
    fontSize: 13,
    fontWeight: "bold",
  },
  rightValue: {},
  nutrientValue: {},
});
