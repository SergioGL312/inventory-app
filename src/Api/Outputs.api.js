// Salidas.js
import { useState, useEffect } from "react";
import { SALIDAS as DB_SALIDAS } from "../Api/db";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSalidas = () => {
  const [salidas, setSalidas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('cachedOutputs');
      if (cachedData !== null) {
        setSalidas(JSON.parse(cachedData));
        setLoading(false);
      } else {
        const snapshot = await DB_SALIDAS.orderBy('id_salida', 'asc').get();
        const nuevasSalidas = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSalidas(nuevasSalidas);
        await AsyncStorage.setItem('cachedOutputs', JSON.stringify(nuevasSalidas));
        setLoading(false);
      }
    } catch (error) {
      console.error('Error al cargar datos desde Firestore: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      const snapshot = await DB_SALIDAS.orderBy('id_salida', 'asc').get();
      const nuevasSalidas = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSalidas(nuevasSalidas);
      await AsyncStorage.setItem('cachedOutputs', JSON.stringify(nuevasSalidas));
      setLoading(false);
    } catch (error) {
      console.error('Error al realizar el refetch desde Firestore: ', error);
      setLoading(false);
    }

  };

  return { salidas: salidas, loading, refetch };
}

// ULTIMO ID
export const getLastIDSalidas = async () => {
  try {
    const snapshot = await DB_SALIDAS.get();
    if (snapshot.size === 0) {
      return snapshot.size + 1;
    } else {
      const snapshotOrder = await DB_SALIDAS.orderBy('id_salida', 'desc').limit(1).get();
      const utimoDoc = snapshotOrder.docs[0];
      const ultimoId = utimoDoc.data().id_salida + 1;
      return ultimoId;
    }
  } catch (error) {
    console.error("Error al obtener el último ID de salidas:", error);
    throw error;
  }
}

// Agregar Nuevo Producto
export const addNewSalida = async (datos, refetchCallback) => {
  try {
    await DB_SALIDAS.add(datos);
    await refetchCallback();
    return { success: true, message: 'Venta agregada correctamente.' };
  } catch (error) {
    console.error("Error al agregar la salida:", error);
    return { success: false, message: 'Error al agregar la salida.' };
  }
}

export const borrarTodasSalidas = async () => {
  try {
    // Obtén todos los documentos de la colección
    const querySnapshot = await DB_SALIDAS.get();

    // Elimina cada documento
    querySnapshot.forEach(async (doc) => {
      await DB_SALIDAS.doc(doc.id).delete();
      console.log(`Documento con ID ${doc.id} eliminado correctamente.`);
    });

    console.log('Todos los documentos eliminados correctamente.');
  } catch (error) {
    console.error('Error al eliminar documentos:', error.message);
  }
};