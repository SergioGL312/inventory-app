import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';


export default function InventarioComponent({ screen, navigation, route, productos, selectedItems, toggleItemSelection }) {

  const renderItem = ({ item }) => {
    return (
      <>
        {screen === 'Incoming' || screen === 'Outcoming' ? (
          <TouchableOpacity
            style={[
              styles.productoContainer,
              selectedItems.find((selectedItem) => selectedItem.id_producto === item.id_producto) && styles.selectedItem,
            ]}
            onPress={() => toggleItemSelection(item)}
          >
            <View>
              <Image source={{ uri: 'https://picsum.photos/200/200' }} style={styles.productoImagen} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.productoNombre}>{item.nombre}</Text>
            </View>
            <View style={styles.stockActualContainer}>
              <Text style={{ fontWeight: '500', fontSize: 14 }}>{item.stock_actual}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate(route, { producto: item })}
            style={styles.productoContainer}
          >

            <View>
              <Image source={{ uri: 'https://picsum.photos/200/200' }} style={styles.productoImagen} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.productoNombre}>{item.nombre}</Text>
            </View>


            <View style={styles.stockActualContainer}>
              <Text style={{ fontWeight: '500', fontSize: 14 }}>{item.stock_actual}</Text>
            </View>

          </TouchableOpacity >
        )}
      </>

    );
  }

  return (
    <FlatList
      data={productos}
      keyExtractor={(item) => item.id_producto}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  productoContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectedItem: {
    backgroundColor: '#B9B8F8',
  },
  productoImagen: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 16,
  },
  productoNombre: {
    fontSize: 17,
    fontWeight: '600',
  },
  stockActualContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});