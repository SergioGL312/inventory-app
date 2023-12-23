// productos.js

import { saveData, getData } from './AsyncStorage.api';
import AsyncStorage, { clearAsyncStorage } from '@react-native-async-storage/async-storage';


const productosKey = 'productos';
const versionKey = 'version'; // Nueva clave para la versión

const updateDataIfNeeded = async () => {
  try {
    const currentVersion = await AsyncStorage.getItem(versionKey);
    const jsonData = require('../Data/P1.json'); // Cambia la ruta según tu estructura

    if (!currentVersion || currentVersion !== jsonData.version?.toString()) {
      // Agrega la lógica de actualización solo si no hay versión actual o si es diferente
      await AsyncStorage.setItem(versionKey, jsonData.version.toString());
      await AsyncStorage.setItem(productosKey, JSON.stringify(jsonData.productos));
    }
  } catch (error) {
    console.error('Error al actualizar datos:', error);
  }
};

const initProductos = async () => {
  try {
    await clearAsyncStorage();
    await updateDataIfNeeded(); // Llama a la función de actualización
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

export const agregarProducto = async (producto) => {
  try {
    const productos = await getProductos();
    productos.push(producto);
    await saveData(productosKey, productos);
  } catch (error) {
    console.error('Error al agregar producto:', error);
  }
};
