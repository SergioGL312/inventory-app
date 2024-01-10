import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';

// ICONS
import Icon from 'react-native-vector-icons/FontAwesome';
// ROUTES
import { ROUTES } from '../Constants/navigation.constants';
// API
import { editOutputs, updateStock } from '../Api/AsyncStorage.api';
import { editNewDocOutputs, getSalidas } from '../Api/Outputs.api';
// COMPONENT
import HeaderIncomingAndOutcomingComponent from '../Components/HeaderIncomingAndOutcomingComponent';

export default function Outcoming({ navigation, route }) {
  const [currentDate, setCurrentDate] = useState('');
  const selectedItems = route.params?.selectedItems || [];
  const [quantities, setQuantities] = useState({});
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [noDoc, setNoDoc] = useState(0);
  const [quantityErrors, setQuantityErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const salidas = await getSalidas();
      const size = Object.keys(salidas).length + 1;
      setNoDoc(size);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  const navigateToProductsScreen = () => {
    navigation.navigate(ROUTES.inventory, { pantallaAnterior: 'Outcoming' });
  }

  useEffect(() => {
    const areAllQuantitiesFilled = selectedItems.every((item) =>
      quantities[item.id_producto] !== undefined &&
      quantities[item.id_producto] !== '' &&
      quantities[item.id_producto] <= item.stock_actual
    );

    setIsSaveButtonDisabled(!areAllQuantitiesFilled); // true - negado false
  }, [quantities, selectedItems]);

  const updateQuantity = (productId, quantity, stock_actual, nombre_producto) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
    if (quantity > stock_actual) {
      setQuantityErrors((prevErrors) => ({
        ...prevErrors,
        [productId]: true,
      }));
      Alert.alert(
        'Error',
        `La cantidad de venta de ${nombre_producto} es mayor que el stock actual.`,
      );
    } else {
      setQuantityErrors((prevErrors) => ({
        ...prevErrors,
        [productId]: false,
      }));
    }

  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={{ color: quantityErrors[item.id_producto] ? 'red' : 'black' }}>{item.nombre}</Text>
      <TextInput
        style={[styles.quantityInput, { color: quantityErrors[item.id_producto] ? 'red' : 'black' }]}
        placeholder="Cantidad"
        keyboardType="numeric"
        value={(quantities[item.id_producto] || '').toString()}
        onChangeText={(text) => updateQuantity(item.id_producto, text, item.stock_actual, item.nombre)}
      />
    </View>
  );

  const saveData = async () => {
    const salidaData = {
      id_salida: noDoc,
      productos: selectedItems.map((item) => ({
        id_producto: item.id_producto,
        nombre_producto: item.nombre,
        cantidad: quantities[item.id_producto] || 0,
      })),
      fecha: currentDate
    };

    editNewDocOutputs(salidaData);

    for (const item of selectedItems) {
      const cant = quantities[item.id_producto] || 0;
      await editOutputs('productos', item.id_producto, cant);
      await updateStock('productos', item.id_producto, cant, false);
    }

    Alert.alert(
      'Guardado',
      'Venta guardadas correctamente.',
      [
        {
          text: 'Aceptar',
          onPress: () => navigation.navigate(ROUTES.main),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <HeaderIncomingAndOutcomingComponent
        backgroundColor="#F8B8B8"
        accion="venta"
        currentDate={currentDate}
        noDoc={noDoc}
      />

      {selectedItems.length > 0 ? (
        <>
          <FlatList
            data={selectedItems}
            keyExtractor={(item) => item.id_producto.toString()}
            renderItem={renderItem}
          />
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'normal',
              marginBottom: 20,
              textAlign: 'center'
            }}
          >No has seleccionado ningun producto de venta</Text>
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <View style={styles.column}>
          {selectedItems.length > 0 ? (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: isSaveButtonDisabled ? '#5DA965' : 'green' }]}
              onPress={saveData}
              disabled={isSaveButtonDisabled}
            >
              <Icon name="save" size={30} color="white" />
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={styles.column}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'blue' }]}
            onPress={navigateToProductsScreen}
          >
            <Icon name="shopping-cart" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 60,
    height: 60,
    marginLeft: 26,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    paddingLeft: 30,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  quantityInput: {
    width: 80,
  },
});