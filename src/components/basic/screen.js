import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native';


export default function Screen ({ style, children }) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  }
})