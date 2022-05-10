import React from 'react'
import { View, StyleSheet, Modal as NativeModal } from 'react-native'
import { useTheme } from '../utils/themes'
import Screen from './screen'


export default function Modal({ children, visible, onClose }) {
  const { general: colors } = useTheme()

  const modalColor = {
    borderColor: colors.primary
  }

  return (
    <NativeModal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Screen style={styles.container}>
        <View style={[styles.modal, modalColor]}>
          {children}
        </View>
      </Screen>
    </NativeModal>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  modal: {
    padding: 10,
    paddingTop: 10, // spacing
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})