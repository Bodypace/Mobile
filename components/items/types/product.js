import { StyleSheet } from "react-native"
import { roboto } from "../../../utils/fonts"
import { readProductFields, readPrice } from 'mobile/utils/readers'


export const values = item => {
  const fields = readProductFields(item, ["name", "vendor"])
  const price = readPrice(item)

  return {
    name: fields[0],
    remark: price && `${price} PLN`,
    leftValue: fields[1],
    rightValue: `${item.amount} g`,
  }
}

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 25,
  },
  selectedContainer: {
    backgroundColor: "#E5FCDD",
    paddingBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  remark: {
    paddingTop: 2,
    color: 'grey',
    fontSize: 14,
  },
  leftValue: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  rightValue: {

  },
  nutrientValue: {

  },
})