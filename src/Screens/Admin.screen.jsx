import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, TextInput, StyleSheet } from 'react-native';

// ASYNC
import AsyncStorage from '@react-native-async-storage/async-storage';

// API
import { guardarDatosEnArchivo, getProductos } from '../Api/Products.api';

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
        onPress={borrarKeys}
      >
        <Text style={styles.buttonText}>Borrar Keys</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#F1948A' }]}
        onPress={() => {
          productos();
          setModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Mostrar Productos</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Productos:</Text>

          <TextInput
            style={styles.textInput}
            multiline
            value={editedText}
          />

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
