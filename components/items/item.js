import React, { useState } from "react"
import { View, Pressable, StyleSheet } from "react-native"
import { Separator, SpacedTexts } from "../../bricks"
import Nutrients from "../nutrients/nutrients"
import { Button } from "./buttons"
import Overlay from './overlay'
import { styles as mealStyles, values as mealValues } from "./types/meal"
import { styles as goalStyles, values as goalValues } from "./types/goal"
import { styles as itemStyles, values as itemValues } from "./types/product"
import { selectedGoalId, selectedItemId, selectedMealId } from "mobile/utils/cache"


export default function Item({ item, overlays }) {
  const [selectedOverlay, setSelectedOverlay] = useState(null)
  const { __typename, id, isSelected } = item
  const hideSeparator = __typename === "Goal" || __typename == "Meal"

  const { name, remark, leftValue, rightValue } =
    __typename === "Goal"
      ? goalValues(item)
      : __typename === "Meal"
        ? mealValues(item)
        : itemValues(item)

  const setSelectedId =
    __typename === "Goal"
      ? selectedGoalId
      : __typename === "Meal"
        ? selectedMealId
        : selectedItemId

  const nutrientsToShow =
    __typename === "Goal"
      ? ['kcal', 'protein', 'carb', 'fat', 'salt']
      : __typename === "Meal"
        ? undefined
        : ['kcal', 'protein', 'carb', 'sugar', 'fat', 'saturated', 'salt']

  const styles =
    __typename === "Goal"
      ? goalStyles
      : __typename === "Meal"
        ? mealStyles
        : itemStyles

  return (
    <>
      {selectedOverlay && <Overlay
        visible={selectedOverlay !== null}
        onClose={() => setSelectedOverlay(null)}
        item={item}
        layout={selectedOverlay?.layout}
        action={selectedOverlay?.action}
      />}
      <Pressable
        style={[styles.container, isSelected ? styles.selectedContainer : {}]}
        onPress={() => setSelectedId(isSelected ? null : id)}>
        {!hideSeparator && <Separator style={commonStyles.separator} />}
        <SpacedTexts
          style={commonStyles.row}
          leftStyle={styles.name} left={name}
          rightStyle={styles.remark} right={remark}
        />
        {(leftValue || rightValue) &&
          <SpacedTexts
            style={commonStyles.row}
            leftStyle={styles.leftValue} left={leftValue}
            rightStyle={styles.rightValue} right={rightValue}
          />
        }
        {item && nutrientsToShow && <Nutrients
          items={[item]}
          fields={nutrientsToShow}
          hideTitle
          valueStyle={styles.nutrientValue}
        />}
        {isSelected &&
          <View style={commonStyles.buttons}>
            {overlays.map(overlay =>
              <Button
                key={overlay.name}
                name={overlay.name}
                onPress={() => setSelectedOverlay(overlay)}
              />
            )}
          </View>
        }
      </Pressable>
    </>
  )
}

const commonStyles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    marginBottom: 5,
  },
  row: {
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
})