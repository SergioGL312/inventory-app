// Entradas.js
import { useState, useEffect } from "react";
import { ENTRADAS as DB_ENTRADAS } from "../Api/db";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const getEntradas = () => {
  const [entradas, setEntradas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('cachedEntradas');
      if (cachedData !== null) {
        setEntradas(JSON.parse(cachedData));
        setLoading(false);
      } else {
        const snapshot = await DB_ENTRADAS.orderBy('id_entrada', 'asc').get();
        const nuevasEntradas = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEntradas(nuevasEntradas);
        await AsyncStorage.setItem('cachedEntradas', JSON.stringify(nuevasEntradas));
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
      const snapshot = await DB_ENTRADAS.orderBy('id_entrada', 'asc').get();
      const nuevasEntradas = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEntradas(nuevasEntradas);
      await AsyncStorage.setItem('cachedEntradas', JSON.stringify(nuevasEntradas));
      setLoading(false);

    } catch (error) {
      console.error('Error al realizar el refetch desde Firestore: ', error);
      setLoading(false);
    }
  };

  return { entradas: entradas, loading, refetch };
}

// ULTIMO ID
export const getLastIDEntradas = async () => {
  try {
    const snapshot = await DB_ENTRADAS.get();
    if (snapshot.size === 0) {
      return snapshot.size + 1;
    } else {
      const snapshotOrder = await DB_ENTRADAS.orderBy('id_entrada', 'desc').limit(1).get();
      const utimoDoc = snapshotOrder.docs[0];
      const ultimoId = utimoDoc.data().id_entrada + 1;
      return ultimoId;
    }
  } catch (error) {
    console.error("Error al obtener el último ID de entradas:", error);
    throw error;
  }
}

// Agregar Nuevo Producto
export const addNewEntrada = async (datos, refetchCallback) => {
  try {
    await DB_ENTRADAS.add(datos);
    await refetchCallback();
    return { success: true, message: 'Compra agregada correctamente.' };
  } catch (error) {
    console.error("Error al agregar la entrada:", error);
    return { success: false, message: 'Error al agregar la entrada.' };
  }
}

export const borrarTodasEntradas = async () => {
  try {
    // Obtén todos los documentos de la colección
    const querySnapshot = await DB_ENTRADAS.get();

    // Elimina cada documento
    querySnapshot.forEach(async (doc) => {
      await DB_ENTRADAS.doc(doc.id).delete();
      console.log(`Documento con ID ${doc.id} eliminado correctamente.`);
    });

    console.log('Todos los documentos eliminados correctamente.');
  } catch (error) {
    console.error('Error al eliminar documentos:', error.message);
  }
};
