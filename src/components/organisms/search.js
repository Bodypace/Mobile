import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "../atoms";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Search() {
  return (
    <View style={styles.searchRow}>
      <View style={styles.searchBox}>
        <TextInput style={styles.search} placeholder="Product name or vendor" />
        <MaterialIcons
          style={styles.searchClearIcon}
          name="cancel"
          size={20}
          color="grey"
        />
      </View>
      <MaterialCommunityIcons
        style={styles.searchIcon}
        name="barcode-scan"
        size={28}
        color="black"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    flex: 1,
    paddingVertical: 5,
  },
  searchClearIcon: {
    marginHorizontal: 5,
  },
  search: {
    flex: 1,
  },
  searchIcon: {
    marginLeft: 5,
  },
});
