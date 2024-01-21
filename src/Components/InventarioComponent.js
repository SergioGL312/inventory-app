import React, { memo } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const InventarioComponent = memo(({ screen, navigation, route, productos, selectedItems, toggleItemSelection, handleEliminarProducto }) => {

  const renderItem = ({ item }) => {
    const handleLongPress = () => {
      Alert.alert(
        'Eliminar producto',
        '¿Estás seguro de que deseas eliminar este producto?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', onPress: () => handleEliminarProducto(item) },
        ],
        { cancelable: true }
      );
    };

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
            onLongPress={handleLongPress}
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
});

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

export default InventarioComponent;