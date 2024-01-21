import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// ASYNC
import { borrarTodosProductos } from '../Api/Products.api';
import { borrarTodasSalidas } from '../Api/Outputs.api';
import { borrarTodasEntradas } from '../Api/Entries.api';
import { PRODUCTOS } from '../Api/db';

const Main = () => {

  async function borrarProductos() {
    borrarTodosProductos();
  }

  async function borrarEntradas() {
    borrarTodasEntradas();
  }

  async function borrarSalidas() {
    borrarTodasSalidas();
  }

  const subirDatosDBProductos = async () => {
    console.log("Hecho");
    // const datosProductos = require('../Data/P1.json');

    // // almacenar por idDoc random
    // datosProductos.productos.forEach((producto) => {
    //   PRODUCTOS.add(producto)
    //     .then((docRef) => {
    //       console.log('Producto agregado correctamente a Firestore con ID de documento:', docRef.id);
    //     })
    //     .catch((error) => {
    //       console.error('Error al agregar producto a Firestore: ', error);
    //     });
    // });

    // almacenar por idDoc id_producto
    // datosProductos.productos.forEach((producto) => {
    //   const { id_producto, ...restoDatos } = producto;
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
        style={[styles.button, { backgroundColor: '#ABEBC6' }]}
        onPress={subirDatosDBProductos}
      >
        <Text style={styles.buttonText}>Importar a db</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#F1948A' }]}
        onPress={borrarProductos}
      >
        <Text style={styles.buttonText}>Borrar Productos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#F1948A' }]}
        onPress={borrarEntradas}
      >
        <Text style={styles.buttonText}>Borrar Entradas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#D2B4DE' }]}
        onPress={borrarSalidas}
      >
        <Text style={styles.buttonText}>Borrar Salidas</Text>
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
