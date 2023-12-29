import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

// FILTER
import filter from 'lodash.filter';

// API
import { getProductos } from '../Api/Products.api';

// ROUTES
import { ROUTES } from '../Constants/navigation.constants';

// ICONS
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Inventory({ navigation, route }) {
  const [productos, setProductos] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [screen, setScreen] = useState(false);
  const { pantallaAnterior } = route.params;
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (pantallaAnterior === 'Incoming') {
      setScreen(true);
    } else {
      setScreen(false);
    }
  }, [pantallaAnterior, screen]);

  useEffect(() => {
    const fetchData = async () => {
      const productosData = await getProductos();
      setProductos(productosData);
      setFullData(productosData);
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (product) => {
      return contains(product, formattedQuery);
    });
    setProductos(filteredData);
  }

  const contains = (product, query) => {
    if (product.nombre.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerRight: () => (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder='Search'
            clearButtonMode='always'
            autoCorrect={false}
            value={searchQuery}
            onChangeText={(query) => handleSearch(query)}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={clearSearch}>
              <Text style={{ color: "#ccc" }}>x</Text>
            </TouchableOpacity>
          )}
        </View>
      ),
    });
  }, [navigation, searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
    setProductos(fullData);
  };

  const renderProducto = ({ item }) => (
    <>
      {screen ? (
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
            <Text>{item.id_producto}</Text>
          </View>
          <View style={styles.stockActualContainer}>
            <Text style={{ fontWeight: '500', fontSize: 14 }}>{item.stock_actual}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View
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
        </View>
      )}
    </>
  );

  const toggleItemSelection = (item) => {
    console.log("presionado ", item.id_producto);
    const isSelected = selectedItems.some((selectedItem) => selectedItem.id_producto === item.id_producto);

    if (isSelected) {
      // Si el elemento ya está seleccionado, quítalo de la lista
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((selectedItem) => selectedItem.id_producto !== item.id_producto)
      );
    } else {
      // Si el elemento no está seleccionado, agrégalo a la lista
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, { id_producto: item.id_producto, nombre: item.nombre }]);
    }
  };

  const navigateToIncomingScreen = () => {
    navigation.navigate(ROUTES.incoming, { selectedItems });
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={productos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderProducto}
        extraData={selectedItems}
      />
      <Text>Elementos seleccionados: {selectedItems.join(', ')}</Text>
      {screen ? (
        <TouchableOpacity
          style={styles.addButton}
          onPress={navigateToIncomingScreen}
        >
          <Icon name="save" size={30} color="white" />
        </TouchableOpacity>
      ) : null}
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
  searchInput: {
    width: '100%',
    marginRight: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  searchContainer: {
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#B9B8F8',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
