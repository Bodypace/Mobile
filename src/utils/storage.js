import AsyncStorage from '@react-native-async-storage/async-storage';


export default {
  store: (key, value) => {
    try {
      return AsyncStorage.setItem(key, value)
    } catch (e) {
      console.log(`storage store error key: ${key} value: ${value}`)
    }
  },
  read: (key) => {
    try {
      return AsyncStorage.getItem(key)
    } catch (e) {
      console.log(`storage read error key: ${key}`)
    }
  },
  remove: (key) => {
    try {
      return AsyncStorage.removeItem(key)
    } catch (e) {
      console.log(`storage remove error key: ${key}`)
    }
  }
}