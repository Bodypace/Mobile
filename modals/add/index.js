import React, { useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { TextInput } from '../../bricks'
import { Separator } from '../../bricks'
import Product from './product'
import { useAuth } from '../../utils/auth'
import { useDay } from '../../utils/cache'
import { roboto } from '../../utils/fonts'
import { useProductsQuery } from './graph';


export default function Products() {
  const auth = useAuth()
  const day = useDay()
  const { loading, error, data } = useProductsQuery(day)

  useEffect(() => {
    if (error && error.message.startsWith('401: Unauthorized')) {
      auth.onAutoLogout()
    }
  }, [error])

  if (loading) {
    return <Text>Loading ...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const { products } = data

  return (
      // <Modal
      //   animationType='slide'
      //   transparent={true}
      //   visible={visible}
      //   onRequestClose={() => setVisible(false)}
      // >
      //   <Products />
      // </Modal>
    <View style={styles.content}>
      <Text style={styles.title}>add more {'>'} Breakfast</Text>
      <Separator style={styles.topSeparator} />
      <View style={styles.options}>
        <Text style={styles.option}>Adding</Text>
        <View style={styles.optionsSeparator} />
        <Text style={styles.option}>Recent</Text>
        <Text style={styles.option}>Products</Text>
        <Text style={styles.option}>In Home</Text>
        <Text style={styles.option}>Favorites</Text>
      </View>
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <TextInput style={styles.search} placeholder="Product name or vendor" />
          <MaterialIcons style={styles.searchClearIcon} name="cancel" size={20} color="grey" />
        </View>
        <MaterialCommunityIcons style={styles.searchIcon} name="barcode-scan" size={28} color="black" />
      </View>
      <Separator style={styles.topSeparator} />
      <ScrollView style={styles.scroll}>
        {products.map(product =>
          <Product key={product.id} item={product} />
        )}
      </ScrollView>
      <Text>end</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    // alignSelf: 'stretch',
    // backgroundColor: "purple",
    backgroundColor: "#fff",
    flex: 1,
    margin: 5,
    maxHeight: "95%",

    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  scroll: {
    // flex: 1,
  },
  title: {
    textAlign: "center",
    marginVertical: 5,
    fontSize: 18,
  },
  topSeparator: {
    backgroundColor: "darkgreen",
  },
  options: {
    flexDirection: "row",
    marginTop: 5,
  },
  optionsSeparator: {
    width: 1,
    height: '100%',
    backgroundColor: 'darkgreen',
    marginHorizontal: 10,
  },
  option: {
    flex: 1,
    marginTop: 5,
    textAlign: "center",
    fontFamily: roboto.regular,
    fontSize: 12,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    flex: 1,
    paddingVertical: 5,
  },
  searchClearIcon: {
    marginHorizontal: 5,
  },
  search: {
    flex: 1,
  },
  searchIcon: {
    marginLeft: 5,
  }
})
