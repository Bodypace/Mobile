import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text } from 'react-native';
import Products from "../../../screens/products";

export default function AddMore({ color, onPress }) {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Modal visible={visible} onRequestClose={() => setVisible(false)}>
        <Products />
      </Modal>
      <Pressable style={styles.container} onPress={() => setVisible(!visible)}>
        <Text style={[styles.text, { color }]}>(add more)</Text>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  text: {
    marginHorizontal: 10,
  }
})