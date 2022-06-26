import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { useTheme } from "../../../utils/themes";
import { useFormikContext } from "formik";
import { makeProcessedFieldsMerger } from '@apollo/client/cache/inmemory/helpers';

export default function FormError({ name }) {
  const { general: colors } = useTheme();
  const value = useRef(new Animated.Value(0)).current;
  const {
    errors: { [name]: error },
    touched: { [name]: touched },
  } = useFormikContext();
  const visible = touched && error 

  useEffect(() => {
    Animated.timing(value, {
      toValue: visible ? 40 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [visible]);

  return (
    <View>
    <Animated.Text
      style={[styles.text, { color: 'white' }, { height: value }]}
    >
      {error}
    </Animated.Text>
    <Animated.View style={[styles.triangle, {
      borderTopWidth: value.interpolate({
        inputRange: [0 ,40],
        outputRange: [0 , 13]
      }),
      borderLeftWidth: value.interpolate({
        inputRange: [0 ,40],
        outputRange: [0 , 7]
      }),
      borderRightWidth: value.interpolate({
        inputRange: [0 ,40],
        outputRange: [0 , 7]
      }),
      marginBottom: value.interpolate({
        inputRange: [0 ,40],
        outputRange: [0 , 5]
      }),
    }]}></Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    backgroundColor: 'indianred'
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 13,
    // borderLeftWidth: 7,
    // borderRightWidth: 7,
    borderBottomWidth: 0,
    borderTopColor: 'indianred',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    marginLeft: 20,
  },
})
