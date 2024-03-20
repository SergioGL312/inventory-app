import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { updateImage } from '../Api/Images.api';
import { AntDesign } from '@expo/vector-icons';
// HOOKS
import { updateProducto } from '../Api/Products.api';
// ROUTES
import { ROUTES } from '../Constants/navigation.constants';

export default function EditProduct({ navigation, route }) {
  const { id_producto, id, nombre, stock_actual, url } = route.params.producto;
  const [editedNombre, setEditedNombre] = useState(nombre);
  const [editedStockActual, setEditedStockActual] = useState(stock_actual.toString());
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [selectedImage, setSelectedImage] = useState(url);

  useEffect(() => {
    const hasChanges =
      editedNombre !== nombre ||
      editedStockActual.toString() !== stock_actual.toString() ||
      selectedImage !== url;

    setIsSaveButtonDisabled(!hasChanges);
  }, [editedNombre, editedStockActual, nombre, stock_actual, selectedImage]);

  const handleSave = async () => {
    setIsLoading(true);
    setIsSaveButtonDisabled(!isSaveButtonDisabled);
    const stockValue = editedStockActual.trim() === '' ? 0 : parseInt(editedStockActual, 10);
    try {

      let newImageUrl = url;

      // Verifica si la imagen ha cambiado
      if (selectedImage !== url) {
        console.log("Si entro al if")
        // Si ha cambiado, actualiza la imagen en Firebase Storage
        newImageUrl = await updateImage(id_producto, selectedImage);
      }
      console.log(stockValue);
      await updateProducto(id, {
        nombre: editedNombre,
        stock_actual: stockValue,
        url: newImageUrl,
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

  // Funtion to select an image from galery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
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
          <Text style={styles.productId}>{id_producto}</Text>
          <Text style={styles.productId}>{id}</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={editedNombre}
              onChangeText={text => setEditedNombre(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Stock Actual:</Text>
            <TextInput
              style={styles.input}
              placeholder='0'
              value={editedStockActual.toString()}
              onChangeText={text => setEditedStockActual(text)}
              keyboardType='numeric'
            />
          </View>
          <TouchableOpacity onPress={pickImage} style={{ marginBottom: 25 }}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.productoImagen} />
            ) : (
              <View style={styles.containerImg}>
                <AntDesign name="plus" size={24} color="black" />
                <Text style={styles.text}>Seleccionar Imagen</Text>
              </View>
            )}

          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <Button title="Guardar" onPress={handleSave} disabled={isSaveButtonDisabled} />
          </View>
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
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  productoImagen: {
    width: 300,
    height: 300,
    marginTop: 10,
    alignSelf: 'center',
  },
  containerImg: {
    width: '100%',
    height: 200,
    borderWidth: 2,
    borderColor: 'black',
    borderStyle: 'dashed',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '50%',
  },
});