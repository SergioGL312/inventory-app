// productos.js

import { saveData, getData } from './AsyncStorage.api';
import * as FileSystem from 'expo-file-system';

const productosKey = 'productos';

const initProductos = async () => {
  try {
    const productos = await getData(productosKey);

    if (!productos || productos.length === 0) {
      const initialData = require('../Data/P1.json');
      await saveData(productosKey, initialData.productos);
      return initialData.productos;
    }
    return productos;
  } catch (error) {
    console.error('Error al cargar datos de productos:', error);
    return [];
  }
};

export const getProductos = async () => {
  try {
    
    return await initProductos() || [];
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

export const agregarProducto = async (nuevoProducto) => {
  try {
    const productos = await getProductos();

    productos.push(nuevoProducto);
    await saveData(productosKey, productos);
  } catch (error) {
    console.error('Error al agregar producto:', error);
  }
};

export const guardarDatosEnArchivo = async (nombreArchivo, formato) => {
  try {
    const datosFormateados = await getData(productosKey);
    
    if (datosFormateados) {
      let contenidoArchivo;

      if (formato === 'json') {
        contenidoArchivo = JSON.stringify(datosFormateados, null, 2);
      } else {
        contenidoArchivo = 'Contenido del archivo .txt:\n';
        contenidoArchivo += JSON.stringify(datosFormateados, null, 2);
      }

      const rutaArchivo = `${FileSystem.documentDirectory}${nombreArchivo}.${formato}`;
      await FileSystem.writeAsStringAsync(rutaArchivo, contenidoArchivo);

      console.log(`Archivo ${rutaArchivo} creado correctamente.`);
      return `Archivo ${rutaArchivo} creado correctamente.`;
    } else {
      console.log('No hay datos en AsyncStorage para guardar en el archivo.');
    }
  } catch (error) {
    console.error('Error al guardar datos en el archivo:', error);
  }
};