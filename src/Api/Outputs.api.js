// Salidas.js

import { saveData, getData } from './AsyncStorage.api';

const salidasKey = 'salidas';

const initSalidas = async () => {
  try {
    const salidas = await getData(salidasKey);

    if (!salidas || salidas.length === 0) {
      const initialData = require('../Data/outputs.json');
      await saveData(salidasKey, initialData.salidas);
      return initialData.salidas;
    }
    return salidas;
  } catch (error) {
    console.error('Error al cargar datos de salidas:', error);
    return [];
  }
};

export const getSalidas = async () => {
  try {

    return await initSalidas() || [];
  } catch (error) {
    console.error('Error al obtener salidas:', error);
    return [];
  }
};

export const editNewDocOutputs = async (nuevaSalida) => {
  try {
    const salidas = await getSalidas();

    salidas.push(nuevaSalida);

    await saveData(salidasKey, salidas);
  } catch (error) {
    console.error('Error al editar la salida del producto:', error);
  }
};