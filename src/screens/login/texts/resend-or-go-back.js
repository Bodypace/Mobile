import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Text_Link from "./link";
import { useFormikContext } from "formik";
import { DroppablePhase } from '../droppable/droppable';

export default function Texts_ResendOrGoBack() {
  const { setFieldValue } = useFormikContext();

  return (
    <View style={styles.container}>
      <Text_Link onPress={() => setFieldValue("phase", DroppablePhase.TOP)}>
        Resend code
      </Text_Link>
      <Text style={styles.text}>or</Text>
      <Text_Link onPress={() => setFieldValue("phase", DroppablePhase.TOP)}>
        Go back
      </Text_Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    marginLeft: 15,
  },
  text: {
    color: "grey",
    paddingHorizontal: 10,
  },
});
