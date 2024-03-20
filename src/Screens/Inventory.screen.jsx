import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

// FILTER
import filter from 'lodash.filter';
// API
import { addNewProduct, getLastIDProductos, getProductos, eliminarProductoPorID } from '../Api/Products.api';
import { uploadImage } from '../Api/Images.api';
// ROUTES
import { ROUTES } from '../Constants/navigation.constants';
// HOOKS
import { useModal } from '../Hooks/modal';
// ICONS
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
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
  const [isLoadingAddNewP, setIsLoadingAddNewP] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (pantallaAnterior === 'Incoming2' || pantallaAnterior === 'Outcoming2') {
      navigation.navigate('Main');
    } else {
      setScreen(pantallaAnterior);
    }
  }, [pantallaAnterior, navigation]);

  useEffect(() => {
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

  const [loaded] = useFonts({
    FontAwesome: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf'),
  });

  if (!loaded) {
    return <ActivityIndicator />;
  }

  const filteredProductos = filter(productos, (producto) =>
    producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectedImage = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const onChangeTextNewProduct = (text) => {
    setTextNewProduct(text);
  }

  const onChangeCantNewProduct = (text) => {
    const newCant = text !== '' ? parseInt(text) : 0;
    setCantNewProduct(newCant);
  }

  const saveNewProduct = async () => {
    setIsLoadingAddNewP(true);
    try {
      const lastId = await getLastIDProductos();
      const downloadURL = await uploadImage(selectedImage, lastId);

      const nuevoProducto = {
        id_producto: lastId,
        nombre: textNewProduct,
        entradas: 0,
        salidas: 0,
        stock_actual: cantNewProduct,
        url: downloadURL
      };

      addNewProduct(nuevoProducto)
        .then((result) => {
          if (result.success) {
            refetch();
            Alert.alert('Guardado', result.message, [
              {
                text: 'Aceptar',
                onPress: () => {
                  setTextNewProduct('');
                  setCantNewProduct(0);
                  setSelectedImage("");
                  setIsLoadingAddNewP(false);
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
      setSelectedImage("");
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

  const handleEliminarProducto = (product) => {
    setIsLoadingDelete(true);
    try {
      eliminarProductoPorID(product.id)
        .then(() => {
          refetch();
          Alert.alert('Exitoso', `El producto ${product.nombre} fue borrado exitosamente.`, [{
            text: 'Aceptar',
            onPress: () => {
              setIsLoadingDelete(false);
            },
          }]);
          console.log('Eliminando producto:', product);
        });
    } catch (error) {
      console.error('Error al borrar el producto:', error);
    }
  };

  if (loading || isLoadingAddNewP || isLoadingDelete) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={"large"} color={"#5500dc"} />
      </View>
    )
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
        handleEliminarProducto={handleEliminarProducto}
      />

      <NewProductOverlayComponent
        visible={visible}
        hide={hide}
        onChangeTextNewProduct={onChangeTextNewProduct}
        onChangeCantNewProduct={onChangeCantNewProduct}
        saveNewProduct={saveNewProduct}
        textNewProduct={textNewProduct}
        selectedImage={selectedImage} // Pasar el valor a NewProductOverlayComponent
        onSelectImage={handleSelectedImage} // Pasar la función para actualizar el valor
      />

      <View style={styles.buttonsContainer}>

        {((screen === 'Incoming' || screen === 'Outcoming') && !loading) ? (
          <View style={styles.column}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: screen === 'Incoming' ? 'green' : 'red' }]}
              onPress={navigateToScreen}
            >
              <FontAwesome name="cart-plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ) : null}

        {((screen === 'Main') || (screen === 'Edit') && !loading) ? (
          <View style={styles.column}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'blue' }]}
              onPress={show}
            >
              <FontAwesome name="plus" size={25} color="white" />
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
