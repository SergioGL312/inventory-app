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
// COMPONENTS
import SearchBarComponent from '../Components/SearchBarComponent';
import NewProductOverlayComponent from '../Components/NewProductoOverlayComponent';

export default function Inventory({ navigation, route }) {
  const [productos, setProductos] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [screen, setScreen] = useState('');
  const { pantallaAnterior } = route.params;
  const [selectedItems, setSelectedItems] = useState([]);
  const { visible, show, hide } = useModal();
  const [textNewProduct, setTextNewProduct] = useState("");
  const [cantNewProduct, setCantNewProduct] = useState(0);

  useEffect(() => {
    setScreen(pantallaAnterior);
  }, [pantallaAnterior, screen]);

  useEffect(() => {
    const fetchData = async () => {
      const productosData = await getProductos();
      setProductos(productosData);
      setFullData(productosData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerRight: () => (
        <SearchBarComponent
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
        />
      ),
    });
  }, [navigation, searchQuery]);

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

  const clearSearch = () => {
    setSearchQuery("");
    setProductos(fullData);
  };

  const RenderProducto = React.memo(({ item, imagenUri }) => (
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
            <Image source={{ uri: imagenUri }} style={styles.productoImagen} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.productoNombre}>{item.nombre}</Text>
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
            <Image source={{ uri: imagenUri }} style={styles.productoImagen} />
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
  ), (prevProps, nextProps) => {
    // Comparación de props para determinar si el componente debe volver a renderizarse
    return prevProps.item.id_producto === nextProps.item.id_producto
      && prevProps.imagenUri === nextProps.imagenUri;
  });

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

  const onChangeCantNewProduct = (text) => {
    const newCant = text !== '' ? parseInt(text) : 0;
    setCantNewProduct(newCant);
  }

  const saveNewProduct = () => {
    const nuevoProducto = {
      id_producto: productos.length + 1,
      nombre: textNewProduct,
      stock_inicial: 0,
      entradas: 0,
      salidas: 0,
      stock_actual: cantNewProduct,
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
        renderItem={({ item }) => <RenderProducto item={item} imagenUri={'https://picsum.photos/200/200'} />}
        extraData={{selectedItems, screen}}
      />

      <NewProductOverlayComponent
        visible={visible}
        hide={hide}
        onChangeTextNewProduct={onChangeTextNewProduct}
        onChangeCantNewProduct={onChangeCantNewProduct}
        saveNewProduct={saveNewProduct}
        textNewProduct={textNewProduct}
      />

      <View style={styles.buttonsContainer}>
        <View style={styles.column}>
          {screen === 'Incoming' || screen === 'Outcoming' ? (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: screen === 'Incoming' ? 'green' : 'red' }]}
              onPress={navigateToScreen}
            >
              <Icon name="cart-plus" size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'blue' }]}
              onPress={show}
            >
              <Icon name="plus" size={25} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  column: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    borderRadius: 30,
    width: 50,
    height: 50,
    marginLeft: 26,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
