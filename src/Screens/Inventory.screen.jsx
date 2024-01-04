import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

// FILTER
import filter from 'lodash.filter';

// API
import { getProductos, agregarProducto } from '../Api/Products.api';

// ROUTES
import { ROUTES } from '../Constants/navigation.constants';

// HOOKS
import { useModal } from '../Hooks/modal';

// ICONS
import Icon from 'react-native-vector-icons/FontAwesome';

// rneui/base
import { Overlay, Button } from '@rneui/base';


export default function Inventory({ navigation, route }) {
  const [productos, setProductos] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [screen, setScreen] = useState('');
  const { pantallaAnterior } = route.params;
  const [selectedItems, setSelectedItems] = useState([]);
  const { visible, show, hide } = useModal();
  const [textNewProduct, setTextNewProduct] = useState("");

  useEffect(() => {
    if (pantallaAnterior === 'Incoming') {
      setScreen('Incoming');
    } else if (pantallaAnterior === 'Outcoming') {
      setScreen('Outcoming');
    } else {
      setScreen('Main');
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
    const isSelected = selectedItems.some((selectedItem) => selectedItem.id_producto === item.id_producto);
    if (isSelected) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((selectedItem) => selectedItem.id_producto !== item.id_producto)
      );
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, { id_producto: item.id_producto, nombre: item.nombre, stock_actual: item.stock_actual }]);
    }
  };

  const navigateToScreen = () => {
    if (screen === 'Incoming') {
      navigation.navigate(ROUTES.incoming, { selectedItems });
    } else {
      navigation.navigate(ROUTES.outcoming, { selectedItems });
    }
  }

  const onChangeTextNewProduct = (text) => {
    setTextNewProduct(text);
  }

  const saveNewProduct = () => {
    const nuevoProducto = {
      id_producto: productos.length + 1,
      nombre: textNewProduct,
      stock_inicial: 0,
      entradas: 0,
      salidas: 0,
      stock_actual: 0,
    };

    agregarProducto(nuevoProducto);
    Alert.alert('Guardado', 'Nuevo producto guardado correctamente');
    setTextNewProduct('');
    hide();
    setProductos([...productos, nuevoProducto]);
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={productos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderProducto}
        extraData={selectedItems}
      />

      <Overlay
        overlayStyle={{ backgroundColor: 'white', width: '80%', padding: 20, height: '25%', justifyContent: 'center' }}
        isVisible={visible}
        onBackdropPress={hide}
      >
        <View>
          <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>Nuevo producto</Text>
          <TextInput
            style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 20 }}
            placeholder='Nombre nuevo producto'
            onChangeText={onChangeTextNewProduct}
          />
        </View>
        <Button
          color="#ECADAD"
          title="Guardar"
          onPress={saveNewProduct}
          disabled={textNewProduct.trim() === ''}
          style={{ marginTop: 20 }}
        />
      </Overlay>

      <View style={styles.buttonsContainer}>
        {screen === 'Incoming' || screen === 'Outcoming' ? (//Incoming izq
          <TouchableOpacity
            style={[styles.button, { backgroundColor: screen === 'Incoming' ? 'green' : 'red' }]}
            onPress={navigateToScreen}
          >
            <Icon name="cart-plus" size={30} color="white" />
          </TouchableOpacity>
        ) : null}

        { }
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'blue' }]}
          onPress={show}
        >
          <Icon name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
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
  button: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginLeft: 26,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
  },
});
