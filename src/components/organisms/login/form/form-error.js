import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import Modal from "../../../basic/modal";

export default function FormError({ name }) {
  const {
    errors: { [name]: error },
    touched: { [name]: touched },
  } = useFormikContext();

  return (
    <Modal visible={!!(touched && error)}>
      <View style={styles.modal}>
        <Text>{error}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    padding: 30,
  },
});
