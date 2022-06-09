import React, { useState } from "react"
import { View, Pressable, StyleSheet } from "react-native"
import { Separator, SpacedTexts } from "../../atoms"
import Nutrients from "../nutrients/nutrients"
import ItemButton from "./item-button"
import EditModal from '../../../modals/edit'

const Overlay = EditModal


export default function Item({
  styles,
  name, remark, leftValue, rightValue,
  showSeparator,
  nutrientsToShow,
  item, overlays,
  setSelectedId,
}) {
  const [selectedOverlay, setSelectedOverlay] = useState(null)
  const { id, isSelected } = item

  return (
    <>
      {selectedOverlay &&
        <Overlay
          visible={selectedOverlay !== null}
          onClose={() => setSelectedOverlay(null)}
          item={item}
          layout={selectedOverlay?.layout}
          action={selectedOverlay?.action}
        />
      }
      <Pressable
        style={[styles.container, isSelected ? styles.selectedContainer : {}]}
        onPress={() => setSelectedId(isSelected ? null : id)}
      >
        {showSeparator &&
          <Separator style={commonStyles.separator} />
        }
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
        {item && nutrientsToShow &&
          <Nutrients
            items={[item]}
            fields={nutrientsToShow}
            hideTitle
            valueStyle={styles.nutrientValue}
          />}
        {isSelected &&
          <View style={commonStyles.buttons}>
            {overlays.map(overlay =>
              <ItemButton
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