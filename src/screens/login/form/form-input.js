import React from "react";
import { View, Text, Animated, TextInput, StyleSheet } from "react-native";
import { roboto } from "../../../utils/fonts";
import { useTheme } from "../../../utils/themes";
import { useFormikContext } from "formik";

export default function FormInput({ name, secure = false, error = false }) {
  const { general: colors } = useTheme();
  const opacity = React.useRef(new Animated.Value(0)).current;

  let {
    values: { [name]: value },
    errors: { [name]: err },
    touched: { [name]: touched },
    handleChange,
    handleBlur,
  } = useFormikContext();

  const errorVisible = touched && err;

  error = error || errorVisible

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: errorVisible ? 1 : 0,
      duration: errorVisible ? 500 : 250,
      useNativeDriver: false,
    }).start();
  }, [errorVisible]);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { borderColor: error ? colors.error : colors.primary },
        ]}
        secureTextEntry={secure}
        placeholder={name}
        value={value}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
      />
      <Animated.Text style={[styles.error, { opacity }]}>{err}</Animated.Text>
    </View>
  );
}

export const FormEmail = () => <FormInput name="email" />;

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    alignSelf: "stretch",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    fontFamily: roboto.regular,
    fontSize: 18,
  },
  error: {
    position: "absolute",
    zIndex: 2,
    color: "red",
    alignSelf: "flex-end",
    paddingRight: 10,
  },
});
