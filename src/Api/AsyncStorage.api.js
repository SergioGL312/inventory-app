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
    const productos = await getData(key);

    if (productos) {
      const productoEditado = productos.find((producto) => producto.id_producto === idProducto);

      if (productoEditado) {
        productoEditado.nombre = nuevoNombre;

        await saveData(key, productos);

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
    const productos = await getData(key);

    if (productos) {
      const productoEditado = productos.find((producto) => producto.id_producto === idProducto);

      if (productoEditado) {

        productoEditado.entradas += parseFloat(cant);

        await saveData(key, productos);
      } else {
        console.warn('No se encontró un producto con el ID especificado.');
      }
    }
  } catch (error) {
    console.error('Error al editar la entrada del producto:', error);
  }
};

export const editOutputs = async (key, idProducto, cant) => {
  try {
    const productos = await getData(key);

    if (productos) {
      const productoEditado = productos.find((producto) => producto.id_producto === idProducto);

      if (productoEditado) {

        productoEditado.salidas += parseFloat(cant);

        await saveData(key, productos);
      } else {
        console.warn('No se encontró un producto con el ID especificado.');
      }
    }
  } catch (error) {
    console.error('Error al editar la salida del producto:', error);
  }
};

export const updateStock = async (key, idProducto, cant, isEntrada) => {
  try {
    const productos = await getData(key);

    if (productos) {
      const producto = productos.find((producto) => producto.id_producto === idProducto);

      if (producto) {
        if (isEntrada) {
          // producto.entradas += parseFloat(cant);
          producto.stock_actual += parseFloat(cant);
        } else {
          // producto.salidas += parseFloat(cant);
          if (parseFloat(cant) > producto.stock_actual) {
            console.warn('La cantidad de salida es mayor que el stock actual.');
          } else {
            producto.stock_actual -= parseFloat(cant);
          }
        }

        await saveData(key, productos);
      } else {
        console.warn('No se encontró un producto con el ID especificado.');
      }
    }
  } catch (error) {
    console.error('Error al actualizar el stock del producto:', error);
  }
};
