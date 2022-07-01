import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Text_Link from "./link";
import { useFormikContext } from "formik";

export default function Texts_SendNewCodeOrGoBack({ onSendNewCode, onGoBack}) {
  const formikContext = useFormikContext();

  return (
    <View style={styles.container}>
      <Text_Link onPress={() => onGoBack(formikContext)}>
        Go back
      </Text_Link>
      <Text style={styles.text}>or</Text>
      <Text_Link onPress={() => onSendNewCode(formikContext)}>
        Send new code
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
