import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

// API
import { getProductos } from '../Api/Products.api';

export default function Inventory() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productosData = await getProductos();
      console.log(productosData);
      setProductos(productosData);
    };

    fetchData();
  }, []);

  const renderProducto = ({ item }) => (
    <View style={styles.productoContainer}>

      <View>
        <Image source={{ uri: 'https://picsum.photos/200/200' }} style={styles.productoImagen} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productoNombre}>{item.nombre}</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text>?</Text>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        data={productos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderProducto}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  productoContainer: {
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  productoImagen: {
    width: 50, // Ajusta según tus necesidades
    height: 50, // Ajusta según tus necesidades
    marginRight: 10, // Ajusta según tus necesidades
  },
  textContainer: {
    backgroundColor: 'red',
    flex: 1,
    paddingLeft: 24,
  },
  productoNombre: {
    paddingLeft: 24,
    fontSize: 16,
    fontWeight: 'normal',
  },
  questionContainer: {
    width: 60,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
