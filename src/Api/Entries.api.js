// Entradas.js

import { saveData, getData } from './AsyncStorage.api';

const entradasKey = 'entradas';

const initEntradas = async () => {
  try {
    const entradas = await getData(entradasKey);
    if (!entradas || entradas.length === 0) {
      const initialData = require('../Data/E.json');
      await saveData(entradasKey, initialData.entradas);
      return initialData.entradas;
    }
    return entradas;
  } catch (error) {
    console.error('Error al cargar datos de entradas:', error);
    return [];
  }
};

export const getEntradas = async () => {
  try {
    return await initEntradas() || [];
  } catch (error) {
    console.error('Error al obtener entradas:', error);
    return [];
  }
};

export const editNewDocEntries = async (nuevaEntrada) => {
  try {
    const entradas = await getEntradas();

    entradas.push(nuevaEntrada);

    await saveData(entradasKey, entradas);
  } catch (error) {
    console.error('Error al editar la entrada del producto:', error);
  }
};