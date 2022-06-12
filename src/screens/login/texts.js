import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { DroppablePhase } from "./droppable/droppable";
import { useFormikContext } from "formik";

const Texts = () => {
  return <></>;
};

Texts.ConfirmationCodeSent = () => {
  const { setFieldValue } = useFormikContext();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
      }}
    >
      <Text style={{ color: "grey" }}>
        we sent confirmation code to your email
      </Text>
      <Pressable onPress={() => setFieldValue("phase", DroppablePhase.TOP)}>
        <Text style={styles.goBack}>go back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordRemark: {
    marginLeft: 25,
    marginBottom: 10,
  },
});

export default Texts;
