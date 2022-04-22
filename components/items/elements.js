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

const makeField = (name, value) => ({
  type: "field",
  name,
  value
})

const makeNutrient = (name) => ({
  type: "nutrient",
  name,
  values: [
    i => readNutrient(i, name),
    i => readNutrient(i, name),
  ]
})

const makeNutrient2 = name => ({
  type: "nutrient",
  name,
  values: [
    i => i[name]
  ]
})

export const fields = {
  goal: {
    name: makeField("name", i => i.name),
    since: makeField("since", i => i.daySince),
    water: makeNutrient2("water"),
    kcal: makeNutrient2("kcal"),
    protein: makeNutrient2("protein"),
    carb: makeNutrient2("carb"),
    fat: makeNutrient2("fat"),
    salt: makeNutrient2("salt"),
  },
  meal: {
    name: makeField("name", i => i.name),
    defaultHour: makeField("default hour", i => i.defaultHour.slice(0, 5)),
    since: makeField("since", i => i.daySince),
    until: makeField("until", i => i.dayUntil || "-"),
  },
  eat: {
    name: makeField("name", i => readProductField(i, "name")),
    vendor: makeField("vendor", i => readProductField(i, "vendor")),
    package: makeField("package", i => `${i.amount} g`),
    kcal: makeNutrient("kcal"),
    protein: makeNutrient("protein"),
    carb: makeNutrient("carb"),
    sugar: makeNutrient("sugar"),
    fat: makeNutrient("fat"),
    saturated: makeNutrient("saturated"),
    salt: makeNutrient("salt"),
    // barcode: makeField("barcode", () => "1294103502"),
    // amount: makeField("amount", i => `${i.amount} g`),
    // price: makeField("price", i => readPrice(i) || "unknown"),
    barcode: {
      type: "nutrient",
      name: "barcode",
      values: [() => "1294103502"],
    },
    amount: {
      type: "nutrient",
      name: "amount",
      values: [i => `${i.amount} g`],
    },
    price: {
      type: "nutrient",
      name: 'price',
      values: [i => readPrice(i) || "unknown"],
    },
  }
}