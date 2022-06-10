import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "../../utils/themes";
import { useFormikContext } from "formik";

export default function Accept({ name }) {
  const { general: colors } = useTheme();
  const linkColors = {
    color: colors.primary,
    borderColor: colors.primary,
  };
  const {
    values: { [name]: checked },
    setFieldValue,
  } = useFormikContext();

  return (
    <Pressable
      style={styles.container}
      onPress={() => console.log("document details")}
    >
      <Pressable
        style={{ borderWidth: 1, width: 20, height: 20, marginRight: 5 }}
        onPress={() => setFieldValue(name, !checked)}
      >
        {checked && (
          <MaterialIcons name="done" size={20} color={colors.primary} />
        )}
      </Pressable>
      <Text style={styles.register}>I accept</Text>
      <Text style={[styles.link, linkColors]}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 35,
  },
  link: {
    marginLeft: 4,
    borderBottomWidth: 1,
  },
});
