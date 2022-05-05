import React, { useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Separator as PlainSeparator, Modal } from '../../../bricks'
import { Field, Fields, Legend, Title } from './elements'
import { Button } from './buttons'


const Separator = (props) => <PlainSeparator {...props} style={styles.separator} />

export default function Overlay({ visible, onClose, item, layout, action }) {
  const [edit, setEdit] = useState({})
  const elements = {
    "title": Title,
    "separator": key => <Separator key={key} />,
    "legend": Legend,
    "field": Field,
    "fields": Fields,
  }

  const onConfirm = () =>
    action(item.id, edit)
      .then(onClose)
      .catch(e => setErrorMessage(JSON.stringify(e)))

  return (
    <Modal visible={visible} onClose={onClose}>
      <ScrollView>
        {layout.map((element, index) => {
          const type = Array.isArray(element) ? "fields" : element.type
          const Element = elements[type]
          return Element === undefined ? <></> :
            <Element
              key={index}
              element={element}
              item={item}
              edit={edit}
              setEdit={setEdit}
            />
        })}
      </ScrollView>
      <View style={styles.buttons}>
        <Button iconName="done" name="Confirm"
          onPress={onConfirm}
        />
        <Button iconName="close" name="Dismiss"
          onPress={onClose}
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