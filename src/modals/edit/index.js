import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Modal from "../../components/basic/modal";
import Elements from "./elements";
import Button from "./button";

export default function EditModal({ visible, onClose, item, layout, action }) {
  const [edit, setEdit] = useState({});

  const onConfirm = () =>
    action(item.id, edit)
      .then(onClose)
      .catch((e) => setErrorMessage(JSON.stringify(e)));

  return (
    <Modal visible={visible} onClose={onClose}>
      <ScrollView>
        <Elements layout={layout} item={item} edit={edit} setEdit={setEdit} />
      </ScrollView>
      <View style={styles.buttons}>
        <Button iconName="done" name="Confirm" onPress={onConfirm} />
        <Button iconName="close" name="Dismiss" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
