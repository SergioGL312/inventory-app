import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert, ActivityIndicator } from 'react-native';

// ICONS
import Icon from 'react-native-vector-icons/FontAwesome';
// ROUTES
import { ROUTES } from '../Constants/navigation.constants';
// API
import { editOutputsProductos, updateStock } from '../Api/Products.api';
import { getLastIDSalidas, addNewSalida } from '../Api/Outputs.api';
// COMPONENT
import HeaderIncomingAndOutcomingComponent from '../Components/HeaderIncomingAndOutcomingComponent';

export default function Outcoming({ navigation, route }) {
  const [currentDate, setCurrentDate] = useState('');
  const selectedItems = route.params?.selectedItems || [];
  const [quantities, setQuantities] = useState({});
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [noDoc, setNoDoc] = useState(0);
  const [quantityErrors, setQuantityErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setQuantities({});
      setIsSaveButtonDisabled(true);
    };
  }, []);

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    setCurrentDate(formattedDate);

    const fetchIDSalida = async () => {
      try {
        const size = await getLastIDSalidas();
        setNoDoc(size);
      } catch (error) {
        console.error('Error al obtener el último ID de salidas:', error);
      }
    }
    fetchIDSalida();
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

  const renderListItem = (item) => {
    return (
      <View key={item.id_producto} style={styles.itemContainer}>
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
  };

  const renderList = () => {
    return selectedItems.map((item) => renderListItem(item));
  };

  const saveData = async () => {
    setIsSaveButtonDisabled(!isSaveButtonDisabled);
    setIsLoading(true);
    try {
      const salidaData = {
        id_salida: noDoc,
        productos: selectedItems.map((item) => ({
          id_producto: item.id_producto,
          nombre_producto: item.nombre,
          cantidad: quantities[item.id_producto] || 0,
        })),
        fecha: currentDate
      };

      const result = await addNewSalida(salidaData);
      if (result.success) {
        for (const item of selectedItems) {
          const cant = quantities[item.id_producto] || 0;

          try {
            const editOutputsResult = await editOutputsProductos(item.id_producto, cant);
            const updateStockResult = await updateStock(item.id_producto, cant, false);

            if (!editOutputsResult.success || !updateStockResult.success) {
              throw new Error(`Error al editar entradas o actualizar stock.`);
            }
          } catch (error) {
            console.error('Error al editar entradas o actualizar stock:', error);
            throw new Error('Error al editar entradas o actualizar stock.');
          }
        }
        Alert.alert(
          'Guardado',
          result.message,
          [
            {
              text: 'Aceptar',
              onPress: () => navigation.navigate(ROUTES.main),
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un error al guardar la compra.');
    } finally {
      setIsLoading(false);
      setIsSaveButtonDisabled(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderIncomingAndOutcomingComponent
        backgroundColor="#F8B8B8"
        accion="venta"
        currentDate={currentDate}
        noDoc={noDoc}
      />

      {isLoading && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'normal',
              marginBottom: 20,
              textAlign: 'center'
            }}
          >Guardando</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {!isLoading && selectedItems.length > 0 ? (
        <ScrollView>
          {renderList()}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {!isLoading && (
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'normal',
                marginBottom: 20,
                textAlign: 'center'
              }}
            >No has seleccionado ningun producto de venta</Text>
          )}

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