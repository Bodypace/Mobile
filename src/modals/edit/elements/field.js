import React, { useState, useRef } from "react";
import { View, Text, Pressable, StyleSheet, Vibration } from "react-native";
import TextInput from "../../../components/atoms/text-input";
import { roboto } from "../../../utils/fonts";
import { useTheme } from "../../../utils/themes";

export const define = {
  text: (name, value, editable = true) => ({
    type: "field",
    datatype: "text",
    name,
    value: value ? value : (i) => i[name],
    editable,
  }),
  number: (name, value, unit = undefined, editable = true) => ({
    type: "field",
    datatype: "number",
    name,
    value: value ? value : (i) => i[name],
    unit,
    editable,
  }),
  eat: (name, unit, editable = false) => ({
    type: "field",
    datatype: "number",
    name,
    values: [
      (i) => i.product[name],
      (i, e) =>
        Math.round((i.product[name] * (e.amount ? e.amount : i.amount)) / 10) /
        10,
    ],
    unit,
    editable,
  }),
};

const getValues = (element) => {
  const values = element.values || [element.value];
  return [values[0], values[1]];
};

export function Field({ flex, element, item, edit, setEdit, vertical }) {
  const { general: colors } = useTheme();

  const { type, name, datatype, unit, editable } = element;
  const [firstValue, otherValue] = getValues(element);
  const _initialValue = useRef(firstValue(item));
  const initialValue = _initialValue.current;

  const [unitVisible, setUnitVisible] = useState(false);

  const [text, setText] = useState(initialValue);
  const changed = text !== initialValue;

  const inputRef = useRef(null);
  const input = {
    focus: () => inputRef.current.focus(),
    reset: () => {
      if (changed && !inputRef.current.isFocused()) {
        setText(initialValue);
        setEdit({ ...edit, [name]: undefined });
        Vibration.vibrate(100);
        return true;
      }
    },
    set: ({ nativeEvent: { text: newText } }) => {
      setText(newText === "" ? undefined : newText);
      setEdit({
        ...edit,
        //99
        [name]:
          initialValue == newText
            ? undefined
            : datatype === "number"
            ? Number(newText)
            : newText,
      });
    },
  };

  const styles = vertical ? verticalStyle : horizontalStyle;

  return (
    <Pressable
      style={[
        {
          // flex: name === "name" ? 1 : undefined
        },
        styles.container,
        flex ? { flex: 2 } : {},
      ]}
      onPress={input.focus}
      onLongPress={input.reset}
      disabled={!editable}
    >
      <Text style={styles.name}>
        {name} {changed ? "*" : ""}
      </Text>
      {otherValue && (
        <View style={styles.valueBox}>
          <Text style={[styles.value, { color: colors[name] }]}>
            {otherValue(item, edit)}
          </Text>
          <Text style={[styles.unit, { color: colors[name] }]}>{unit}</Text>
        </View>
      )}
      {name === "name" ? (
        <TextInput
          ref={inputRef}
          style={[
            styles.value,
            {
              fontFamily: name === "name" ? roboto.bold : roboto.regular,
            },
            { color: colors[name] || colors.text },
          ]}
          onLongPress={input.reset}
          onChange={input.set}
          multiline={type === "field" && name === "name"}
          keyboardType={datatype === "number" ? "numeric" : "default"}
          editable={editable}
        >
          {text}
        </TextInput>
      ) : (
        <View style={styles.valueBox}>
          <TextInput
            ref={inputRef}
            style={[
              styles.value,
              {
                fontFamily: name === "name" ? roboto.bold : roboto.regular,
              },
              { color: colors[name] || colors.text },
            ]}
            onLongPress={input.reset}
            onChange={input.set}
            multiline={type === "field" && name === "name"}
            keyboardType={datatype === "number" ? "numeric" : "default"}
            editable={editable}
            placeholder={"unknown"}
            onPlaceholder={(visible) => setUnitVisible(!visible)}
          >
            {text}
          </TextInput>
          {text !== undefined && unitVisible && (
            <Text style={[styles.unit, { color: colors[name] }]}>{unit}</Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

const horizontalStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 10, //spacing
  },
  name: {
    flex: 1,
    fontFamily: roboto.light,
    fontSize: 22,
  },
  valueBox: {
    flexDirection: "row",
    minWidth: 90,
  },
  value: {
    textAlign: "right",
    fontFamily: roboto.regular,
    fontSize: 20,
    flex: 1,
  },
  unit: {
    textAlign: "right",
    fontFamily: roboto.regular,
    fontSize: 20,
  },
});

const verticalStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    marginBottom: 5,
    fontFamily: roboto.light,
    fontSize: 13,
  },
  valueBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontSize: 18,
  },
  unit: {
    textAlign: "right",
    fontSize: 18,
  },
});
