import { readPrice, readProductField, readNutrient } from '../../utils/readers'

export const elements = {
  title: {
    type: "title",
    text: "Edit Eat",
  },
  separator: {
    type: "separator",
  },
  legend: {
    type: "legend",
    name: "in 100 g",
    extra: {
      color: "amount",
      name: "ate",
    }
  },
  goalLegend: {
    type: "legend",
    name: "in a day",
  }
}

const field = {
  text: (name, value, editable = true) => ({
    type: "field", datatype: "text", name,
    value: value ? value : i => i[name],
    editable,
  }),
  number: (name, value, unit = undefined, editable = true) => ({
    type: "field", datatype: "number", name,
    value: value ? value : i => i[name],
    unit,
    editable,
  }),
  eat: (name, unit, editable = false) => ({
    type: "field", datatype: "number", name,
    values: [
      i => i.product[name],
      (i, e) => Math.round(i.product[name] * (e.amount ? e.amount : i.amount) / 10) / 10,
    ],
    unit,
    editable, 
  })
}

export const fields = {
  goal: {
    name: field.text("name", i => i.name),
    since: field.text("since", i => i.daySince),
    water: field.number("water"),
    kcal: field.number("kcal"),
    protein: field.number("protein"),
    carb: field.number("carb"),
    fat: field.number("fat"),
    salt: field.number("salt"),
  },
  meal: {
    name: field.text("name", i => i.name),
    defaultHour: field.text("default hour", i => i.defaultHour.slice(0, 5)),
    since: field.text("since", i => i.daySince),
    until: field.text("until", i => i.dayUntil || "-"),
  },
  eat: {
    name: field.text("name", i => readProductField(i, "name"), false),
    vendor: field.text("vendor", i => readProductField(i, "vendor"), false),
    package: field.text("package", i => i.product.size ? `${i.product.size} g` : 'N/A', false),
    kcal: field.eat("kcal"),
    protein: field.eat("protein", " g"),
    carb: field.eat("carb", " g"),
    sugar: field.eat("sugar", " g"),
    fat: field.eat("fat", " g"),
    saturated: field.eat("saturated", " g"),
    salt: field.eat("salt", " g"),
    barcode: field.number("barcode", () => "1294103502", undefined, false),
    amount: field.number("amount", i => i.amount, " g"),
    price: field.number("price", i => readPrice(i), " PLN", false),
  }
}