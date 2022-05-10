import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import Spaced from '../../bricks/spaced'
import Nutrients from '../nutrients/nutrients'
import Ionicons from '@expo/vector-icons/Ionicons'


export default function ItemsHeader({ color, hour, name, remark, eats, expanded, setExpanded }) {
  const nameIcon = expanded ? "chevron-down" : "chevron-up"
  return (
    <View style={styles.container}>
      {hour &&
        <Text style={styles.hour}>{hour.slice(0, 5)}</Text>
      }
      <Spaced>
        <Pressable
          style={styles.nameContainer}
          onPress={() => setExpanded(!expanded)}
          disabled={expanded === undefined}
        >
          <Text style={[styles.name, { color }]}>{name}</Text>
          {(expanded === undefined) ? <></> :
            <Ionicons name={nameIcon} size={20} color={color} />
          }
        </Pressable>
        <Text style={styles.remark}>{remark}</Text>
      </Spaced>
      {(eats && eats.length) ?
        <Nutrients
          style={styles.summary}
          valueStyle={styles.summaryValue}
          fields={['kcal', 'protein', 'carb', 'sugar', 'fat', 'saturated', 'salt']}
          items={eats}
          hideTitle
        /> : <></>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginBottom: 25,
  },
  hour: {
    color: 'grey',
    fontSize: 14,
    marginBottom: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginRight: 5,
  },
  remark: {
    color: 'grey',
    fontSize: 18,
  },
  summary: {
    // marginBottom: 25,
  },
  summaryValue: {
    fontSize: 14,
    color: 'red'
  }
})