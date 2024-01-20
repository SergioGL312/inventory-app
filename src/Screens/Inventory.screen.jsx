import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

// FILTER
import filter from 'lodash.filter';
// API
import { addNewProduct, getLastIDProductos, getProductos } from '../Api/Products.api';
// ROUTES
import { ROUTES } from '../Constants/navigation.constants';
// HOOKS
import { useModal } from '../Hooks/modal';
// ICONS
import Icon from 'react-native-vector-icons/FontAwesome';
// COMPONENTS
import SearchBarComponent from '../Components/SearchBarComponent';
import NewProductOverlayComponent from '../Components/NewProductoOverlayComponent';
import InventarioComponent from '../Components/InventarioComponent';

export default function Inventory({ navigation, route }) {
  const { pantallaAnterior } = route.params || {};
  const { productos, loading, refetch } = getProductos();
  const [screen, setScreen] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { visible, show, hide } = useModal();
  const [textNewProduct, setTextNewProduct] = useState("");
  const [cantNewProduct, setCantNewProduct] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);


  useEffect(() => {
    setScreen(pantallaAnterior);
  }, [pantallaAnterior]);

  useEffect(() => { // cuando venga de edit se actualiza el flatlist
    if (route.params.recargar) {
      refetch();
    }
  }, [route.params]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerRight: () => (
        <SearchBarComponent
          searchQuery={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          clearSearch={() => setSearchQuery("")}
        />
      ),
    });
  }, [searchQuery]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={"large"} color={"#5500dc"} />
      </View>
    )
  }

  const filteredProductos = filter(productos, (producto) =>
    producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onChangeTextNewProduct = (text) => {
    setTextNewProduct(text);
  }

  const onChangeCantNewProduct = (text) => {
    const newCant = text !== '' ? parseInt(text) : 0;
    setCantNewProduct(newCant);
  }

  const saveNewProduct = async () => {
    try {
      const lastId = await getLastIDProductos();

      const nuevoProducto = {
        id_producto: lastId,
        nombre: textNewProduct,
        stock_inicial: 0,
        entradas: 0,
        salidas: 0,
        stock_actual: cantNewProduct,
      };

      addNewProduct(nuevoProducto)
        .then((result) => {
          if (result.success) {
            Alert.alert('Guardado', result.message, [
              {
                text: 'Aceptar',
                onPress: () => {
                  setTextNewProduct('');
                  setCantNewProduct(0);
                  refetch();
                },
              },
            ]);
          } else {
            Alert.alert('Error', result.message);
          }
        })
        .catch((error) => {
          console.error('Error al llamar a addNewProduct:', error);
          Alert.alert('Error', result.message);
        });

      hide();
      setTextNewProduct('');
      setCantNewProduct(0);
    } catch (error) {
      console.error('Error al obtener el último ID de productos:', error);
    }
  }

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

  return (
    <View style={{ flex: 1 }}>

      <InventarioComponent
        screen={screen}
        navigation={navigation}
        route={ROUTES.editProduct.name}
        productos={filteredProductos}
        selectedItems={selectedItems}
        toggleItemSelection={toggleItemSelection}
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

        {screen === 'Incoming' || screen === 'Outcoming' ? (
          <View style={styles.column}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: screen === 'Incoming' ? 'green' : 'red' }]}
              onPress={navigateToScreen}
            >
              <Icon name="cart-plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ) : null}

        {((screen === 'Main') || (screen === 'Edit')) ? (
          <View style={styles.column}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'blue' }]}
              onPress={show}
            >
              <Icon name="plus" size={25} color="white" />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedItem: {
    backgroundColor: '#B9B8F8',
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
