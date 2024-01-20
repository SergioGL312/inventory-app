import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
// HOOKS
import { updateProducto } from '../Api/Products.api';
// ROUTES
import { ROUTES } from '../Constants/navigation.constants';

export default function EditProduct({ navigation, route }) {
  const { id, nombre, stock_actual } = route.params.producto;
  const [editedNombre, setEditedNombre] = useState(nombre);
  const [editedStockActual, setEditedStockActual] = useState(stock_actual);

  const handleSave = async () => {
    const stockValue = editedStockActual.trim() === '' ? 0 : parseInt(editedStockActual, 10);
    console.log("Guardar cambios:", editedNombre, stockValue);
    await updateProducto(id, {
      nombre: editedNombre,
      stock_actual: stockValue,
    });
    Alert.alert('Editado', `Producto ${editedNombre} editado correctamente.`, [
      {
        text: "Aceptar",
        onPress: () => { 
          navigation.navigate(ROUTES.inventory, { recargar: true, pantallaAnterior: "Edit"})
        },
      }
    ])
  };

  return (
    <View>
      <Text>{id}</Text>
      <Text>Nombre: </Text>
      <TextInput
        style={styles.input}
        value={editedNombre}
        onChangeText={text => setEditedNombre(text)}
      />
      <Text>Stock Actual: </Text>
      <TextInput
        style={styles.input}
        placeholder='0'
        value={editedStockActual.toString()}
        onChangeText={text => setEditedStockActual(text)}
        keyboardType='numeric'
      />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
