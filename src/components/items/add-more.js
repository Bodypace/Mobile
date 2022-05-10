import React, { useState } from "react";
import { Pressable, Text, StyleSheet, Modal } from 'react-native'
// import Products from "../../modals/add"

export default function AddMore({ color, onPress }) {
  // const [visible, setVisible] = useProductsModal()

  // return (
  //   <WithProductsModal>
  //     <Pressable style={styles.container} onPress={() => setVisible(!visible)}>
  //       <Text style={[styles.text, { color }]}>(add more)</Text>
  //     </Pressable>
  //   </WithProductsModal>
  // )
  const [visible, setVisible] = useState(false)

  return (
    // <WithProductsModal visible={visible} onRequestClose={() => setVisible(false)}>
      <Pressable style={styles.container} onPress={() => setVisible(!visible)}>
        <Text style={[styles.text, { color }]}>(add more)</Text>
      </Pressable>
    // </WithProductsModal>
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