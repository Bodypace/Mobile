import { StyleSheet } from "react-native"
import { roboto } from "../../../utils/fonts"

const commonStyle = StyleSheet.create({
  text: {
    fontFamily: roboto.light,
    fontSize: 16,
  },
})

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginTop: 25,
  },
  selectedContainer: {
    backgroundColor: "#E5FCDD",
    paddingBottom: 5,
  },
  name: {
    fontFamily: roboto.light,
    fontSize: 22,
  },
  remark: commonStyle.text,
  leftValue: commonStyle.text,
  rightValue: commonStyle.text,
})

export const values = goal => {
  return {
    name: goal.name,
    remark: "active",
    leftValue: goal.daySince,
    rightValue: `${goal.water} L`,
  }
}