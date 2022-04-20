import React, { useRef } from 'react'
import { View, StyleSheet } from 'react-native'
import { Separator, Modal } from '../../../bricks'
import { Field, Fields, Legend, Nutrient, Title } from './elements'
import { Button } from './buttons'


export default function Overlay({
  item, layout, visible, setVisible, action,
}) {
  const edit = useRef({})
  const elements = {
    "title": Title,
    "separator": key => <Separator key={key} style={styles.separator} />,
    "legend": Legend,
    "nutrient": Nutrient,
    "field": Field,
    "fields": Fields,
  }

  return (
    <Modal visible={visible} setVisible={setVisible}>
      {layout.map((element, index) => {
        const type = Array.isArray(element) ? "fields" : element.type
        const Element = elements[type]
        return Element === undefined ? <></>
          : <Element key={index} element={element} item={item} edit={edit}/>
      })}
      <View style={styles.buttons}>
        <Button iconName="done" name="Confirm"
          onPress={() => action(item.id, edit.current)}
        />
        <Button iconName="close" name="Dismiss"
          onPress={() => setVisible(false)}
        />
      </View>
    </Modal>
  )
}

const spacing = 10

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#e0e0e0',
    marginBottom: spacing,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
})