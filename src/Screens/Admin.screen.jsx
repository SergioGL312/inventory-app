import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, TextInput, StyleSheet } from 'react-native';

// ASYNC
import AsyncStorage from '@react-native-async-storage/async-storage';

// API
import { guardarDatosEnArchivo, getProductos } from '../Api/Products.api';
import { PRODUCTOS } from '../Api/db';

const Main = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [productosData, setProductosData] = useState([]);
  const [editedText, setEditedText] = useState('');

  const verKeys = async () => {
    const keys = await AsyncStorage.getAllKeys();
    console.log(`Keys: ${keys}`);
    if (keys.length > 0) {
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        console.log(value);
      }
      const response = await guardarDatosEnArchivo("Productos", 'json');
      Alert.alert(
        "Ruta",
        response
      );
    } else {
      console.log(`There isn't ${keys.length}`);
    }
  };

  async function borrarKeys() {
    console.log("Deleted");
    await AsyncStorage.clear();
  }

  const productos = async () => {
    const result = await getProductos();
    console.log(result);
    setProductosData(result);
    setEditedText(JSON.stringify(result, null, 2));
  };

  const actualizarProductos = async () => {
    try {
      // Obtén el texto actualizado desde el estado
      const nuevosProductos = JSON.parse(editedText);

      // Guarda los nuevos productos en AsyncStorage con la clave "productos"
      await AsyncStorage.setItem('productos', JSON.stringify(nuevosProductos));

      // Cierra el modal después de la actualización
      setModalVisible(false);

      // Muestra un mensaje de éxito o realiza otras acciones necesarias
      Alert.alert("Actualización exitosa", "Los productos se han actualizado correctamente en AsyncStorage");
    } catch (error) {
      // Manejo de errores, por ejemplo, mostrar un mensaje de error
      Alert.alert("Error", "Hubo un error al actualizar los productos. Por favor, inténtalo de nuevo.");
    }
  };

  const subirDatosDBProductos = async () => {
    const datosProductos = require('../Data/P1.json');

    // almacenar por idDoc random
    datosProductos.productos.forEach((producto) => {
      PRODUCTOS.add(producto)
        .then((docRef) => {
          console.log('Producto agregado correctamente a Firestore con ID de documento:', docRef.id);
        })
        .catch((error) => {
          console.error('Error al agregar producto a Firestore: ', error);
        });
    });

    // almacenar por idDoc id_producto
    // datosProductos.productos.forEach((producto) => {
    //   const { id_producto, ...restoDatos } = producto;
  
    //   // Utiliza el id_producto como ID del documento
    //   const productoDocument = PRODUCTOS.doc(id_producto.toString());
  
    //   productoDocument.set(restoDatos)
    //     .then(() => {
    //       console.log('Producto agregado correctamente a Firestore con ID de documento:', id_producto);
    //     })
    //     .catch((error) => {
    //       console.error('Error al agregar producto a Firestore: ', error);
    //     });
    // });
}

return (
  <View style={styles.container}>
    <Text style={styles.title}>Admin</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={verKeys}
    >
      <Text style={styles.buttonText}>Ver Keys</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.button, { backgroundColor: '#D2B4DE' }]}
      onPress={() => {
        productos();
        setModalVisible(true);
      }}
    >
      <Text style={styles.buttonText}>Mostrar Productos</Text>
    </TouchableOpacity>

    {/* <TouchableOpacity
      style={[styles.button, { backgroundColor: '#ABEBC6' }]}
      onPress={subirDatosDBProductos}
    >
      <Text style={styles.buttonText}>Importar a db</Text>
    </TouchableOpacity> */}

    <TouchableOpacity
      style={[styles.button, { backgroundColor: '#F1948A' }]}
      onPress={borrarKeys}
    >
      <Text style={styles.buttonText}>Borrar Keys</Text>
    </TouchableOpacity>

    <Modal visible={modalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Productos:</Text>

        <TextInput
          style={styles.textInput}
          multiline
          value={editedText}
          onChangeText={(text) => setEditedText(text)}
        />

        <TouchableOpacity
          style={[styles.button, { marginTop: 10, backgroundColor: '#ABEBC6' }]}
          onPress={actualizarProductos}
        >
          <Text style={styles.buttonText}>Actualizar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { marginTop: 10 }]}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.buttonText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#AED6F1',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: 250,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#AED6F1',
    borderRadius: 5,
    margin: 10,
    padding: 10,
    width: '80%',
    maxHeight: '60%',
    textAlignVertical: 'top',
  },
});

export default Main;
