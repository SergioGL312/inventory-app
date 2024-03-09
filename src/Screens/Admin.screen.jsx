import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ASYNC
import { resetEntradasProductos } from '../Api/Products.api';
import { borrarTodasSalidas } from '../Api/Outputs.api';
import { borrarTodasEntradas } from '../Api/Entries.api';

const Main = () => {

  async function borrarProductos() {
    await AsyncStorage.clear();
    // borrarTodosProductos();
  }

  async function borrarEntradas() {
    borrarTodasEntradas();
    try {
      await AsyncStorage.removeItem('cachedEntradas');
      console.log(`Se ha eliminado correctamente el valor asociado a la clave 'cachedEntradas'.`);
    } catch (error) {
      console.error(`Error al eliminar el valor asociado a la clave 'cachedEntradas':`, error);
    }
  }

  async function borrarSalidas() {
    borrarTodasSalidas();
    try {
      await AsyncStorage.removeItem('cachedOutputs');
      console.log(`Se ha eliminado correctamente el valor asociado a la clave 'cachedOutputs'.`);
    } catch (error) {
      console.error(`Error al eliminar el valor asociado a la clave 'cachedOutputs':`, error);
    }
  }

  const resetearEntradasProductos = async () => {
    resetEntradasProductos()
      .then((result) => {
        console.log(result.message);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#AED6F1' }]}
        onPress={resetearEntradasProductos}
      >
        <Text style={styles.buttonText}>Resetear entradas y salidas de Doc Productos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#F1948A' }]}
        onPress={borrarProductos}
      >
        <Text style={styles.buttonText}>Borrar Cache</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#E74C3C' }]}
        onPress={borrarEntradas}
      >
        <Text style={styles.buttonText}>Borrar Doc de Entradas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#D2B4DE' }]}
        onPress={borrarSalidas}
      >
        <Text style={styles.buttonText}>Borrar Doc de Salidas</Text>
      </TouchableOpacity>

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
