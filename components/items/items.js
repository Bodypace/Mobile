import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import ItemsHeader from './items-header'
import DietItem from './item-diet'
import AddMore from './buttons/add-more'


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
          <DietItem key={eat.id} item={eat} />
        )}
        <AddMore color="darkgreen" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
})
