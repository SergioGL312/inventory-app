// AsyncStorage.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, data) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const getData = async (key) => {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    return jsonData !== null ? JSON.parse(jsonData) : null;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};


export const editarNombreProducto = async (key, idProducto, nuevoNombre) => {
  try {

    // Obtener los productos actuales
    const productos = await getData(key);

    if (productos) {
      // Encontrar el producto por su ID
      const productoEditado = productos.find((producto) => producto.id_producto === idProducto);

      if (productoEditado) {
        // Actualizar el nombre del producto
        productoEditado.nombre = nuevoNombre;

        // Guardar los productos actualizados en AsyncStorage
        await saveData(key, productos);

        console.log('Nombre editado correctamente.');
      } else {
        console.warn('No se encontró un producto con el ID especificado.');
      }
    }
  } catch (error) {
    console.error('Error al editar el nombre del producto:', error);
  }
};

export const editEntries = async (key, idProducto, cant) => {
  try {

    // Obtener los productos actuales
    const productos = await getData(key);

    if (productos) {
      // Encontrar el producto por su ID
      const productoEditado = productos.find((producto) => producto.id_producto === idProducto);

      if (productoEditado) {
        // Actualizar el nombre del producto

        productoEditado.entradas += parseInt(cant);

        await saveData(key, productos);
        console.log('Entrada editada correctamente.');
      } else {
        console.warn('No se encontró un producto con el ID especificado.');
      }
    }
  } catch (error) {
    console.error('Error al editar la entrada del producto:', error);
  }
};

export const updateStock = async (key, idProducto, cant, isEntrada) => {
  try {
    const productos = await getData(key);

    if (productos) {
      const producto = productos.find((producto) => producto.id_producto === idProducto);

      if (producto) {
        if (isEntrada) {
          // producto.entradas += parseInt(cant);
          producto.stock_actual += parseInt(cant);
        } else {
          // producto.salidas += parseInt(cant);
          producto.stock_actual -= parseInt(cant);
        }

        await saveData(key, productos);

        console.log('Stock actualizado correctamente.');
      } else {
        console.warn('No se encontró un producto con el ID especificado.');
      }
    }
  } catch (error) {
    console.error('Error al actualizar el stock del producto:', error);
  }
};
