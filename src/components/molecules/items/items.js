import React, { useState } from 'react'
import { View, StyleSheet, ToastAndroid } from 'react-native'
import ItemsHeader from './items-header'
import Eat from '../../../screens/diet/items/eat'
import AddMore from './add-more'


export default function Items({ hour, name, remark, eats }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <View>
      <ItemsHeader
        color="darkgreen"
        hour={hour}
        name={name}
        remark={remark}
        eats={eats}
        expanded={expanded}
        setExpanded={setExpanded}
      />
      <View style={{ display: expanded ? undefined : 'none' }}>
        {eats.map(eat =>
          <Eat key={eat.id} item={eat} />
        )}
        <AddMore color="darkgreen" onPress={() => ToastAndroid.show("add more", ToastAndroid.SHORT)}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
})
