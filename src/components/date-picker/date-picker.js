import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useReactiveVar } from '@apollo/client'
import moment from 'moment'
import DateBox from './date-box'
import { dayVar } from '../../utils/cache'


export default function DatePicker ({ style }) {
  const day = useReactiveVar(dayVar)

  const date = days => moment(day).add(days, 'days').format('YYYY-MM-DD')

  return (
    <View style={[styles.container, style]}>
      <DateBox
        titleStyle={styles.sideBoxTitle}
        title="Yesterday"
        dateStyle={styles.sideBoxDate}
        date={date(-1)}
      />
      <DateBox
        style={styles.centralBox}
        title="Today"
        dateStyle={styles.centralBoxDate}
        date={day}
        onPress={() => undefined}
      />
      <DateBox
        titleStyle={styles.sideBoxTitle}
        title="Tomorrow"
        dateStyle={styles.sideBoxDate}
        date={date(1)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: 'red',
    borderBottomWidth: 2,
    borderColor: 'darkgreen',
    width: '100%'
  },
  centralBox: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'darkgreen',
  },
  centralBoxDate: {
    fontWeight: 'bold',
  },
  sideBoxTitle: {
    color: 'grey',
  },
  sideBoxDate: {
    color: 'grey',
  }
})
