import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
// HOOKS
import { updateProducto } from '../Api/Products.api';
// ROUTES
import { ROUTES } from '../Constants/navigation.constants';

export default function EditProduct({ navigation, route }) {
  const { id, nombre, stock_actual } = route.params.producto;
  const [editedNombre, setEditedNombre] = useState(nombre);
  const [editedStockActual, setEditedStockActual] = useState(stock_actual.toString());
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  useEffect(() => {
    const hasChanges =
      editedNombre !== nombre ||
      editedStockActual.toString() !== stock_actual.toString();

    setIsSaveButtonDisabled(!hasChanges);
  }, [editedNombre, editedStockActual, nombre, stock_actual]);

  const handleSave = async () => {
    setIsLoading(true);
    setIsSaveButtonDisabled(!isSaveButtonDisabled);
    const stockValue = editedStockActual.trim() === '' ? 0 : parseInt(editedStockActual, 10);
    try {
      await updateProducto(id, {
        nombre: editedNombre,
        stock_actual: stockValue,
      });
      Alert.alert('Editado', `Producto ${editedNombre} editado correctamente.`, [
        {
          text: "Aceptar",
          onPress: () => {
            navigation.navigate(ROUTES.inventory, { recargar: true, pantallaAnterior: "Edit" })
          },
        }
      ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un error al editar el producto.');
    } finally {
      setIsLoading(false);
      setIsSaveButtonDisabled(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Guardando</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <Text style={styles.productId}>{id}</Text>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            value={editedNombre}
            onChangeText={text => setEditedNombre(text)}
          />
          <Text style={styles.label}>Stock Actual:</Text>
          <TextInput
            style={styles.input}
            placeholder='0'
            value={editedStockActual.toString()}
            onChangeText={text => setEditedStockActual(text)}
            keyboardType='numeric'
          />
          <Button title="Guardar" onPress={handleSave} disabled={isSaveButtonDisabled} />
        </>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 20,
    textAlign: 'center',
  },
  productId: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});