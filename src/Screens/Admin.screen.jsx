import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

// ASYNC
import AsyncStorage from '@react-native-async-storage/async-storage';

// API
import { guardarDatosEnArchivo, getProductos } from '../Api/Products.api';

export default function Main({ navigation }) {


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
      console.log(`There isnt ${keys.length}`);
    }
  }

  async function borrarKeys() {
    console.log("Deleted");
    await AsyncStorage.clear();
  }

  const productos = async () => {
    const result = await getProductos();
    console.log(result);
  } 

  return (
    <View>
      <Text>Admin</Text>
      <TouchableOpacity
        style={{ backgroundColor: '#E9F7EF' }}
        onPress={verKeys}
      >
        <Text>Ver Keys</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: '#E74C3C' }}
        onPress={borrarKeys}
      >
        <Text>Borrar Keys</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: '#AED6F1' }}
        onPress={productos}
      >
        <Text>Productos</Text>
      </TouchableOpacity>
    </View>
  );
}