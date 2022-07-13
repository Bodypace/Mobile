import React from "react";
import { StyleSheet } from "react-native";
import Item from "../molecules/items/item";
import { define as title } from "../../modals/edit/elements/title";
import { define as separator } from "../../modals/edit/elements/separator";
import { define as field } from "../../modals/edit/elements/field";
import { define as legend } from "../../modals/edit/elements/legend";
import {
  readPrice,
  readProductField,
  readProductFields,
} from "../../utils/readers";
import { selectedEatId } from "../../utils/cache";
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

export default function Eat({ item }) {
  const client = useApolloClient();

  const edit = {
    name: "Edit",
    layout: [
      title,
      separator,
      [field.text("name", (i) => readProductField(i, "name"), false)],
      [
        field.text("vendor", (i) => readProductField(i, "vendor"), false),
        field.text(
          "package",
          (i) => (i.product.size ? `${i.product.size} g` : "N/A"),
          false
        ),
      ],
      separator,
      legend.per100g,
      field.eat("kcal"),
      field.eat("protein", " g"),
      field.eat("carb", " g"),
      field.eat("sugar", " g"),
      field.eat("fat", " g"),
      field.eat("saturated", " g"),
      field.eat("salt", " g"),
      separator,
      [
        field.number("barcode", () => "1294103502", undefined, false),
        field.number("amount", (i) => i.amount, " g"),
        field.number("price", (i) => readPrice(i), " PLN", false),
      ],
      separator,
    ],
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
      setSelectedId={selectedEatId}
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
