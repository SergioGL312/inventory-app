// Entradas.js
import { useState, useEffect } from "react";
import { ENTRADAS as DB_ENTRADAS } from "../Api/db";

export const getEntradas = () => {
  const [entradas, setEntradas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const snapshot = await DB_ENTRADAS.orderBy('id_entrada', 'asc').get();
      const nuevasEntradas = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEntradas(nuevasEntradas);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar datos desde Firestore: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
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
export const addNewEntrada = async (datos) => {
  try {
    await DB_ENTRADAS.add(datos);
    console.log('Entrada agregada correctamente.');
    return { success: true, message: 'Compra agregada correctamente.' };
  } catch (error) {
    console.error("Error al agregar la entrada:", error);
    return { success: false, message: 'Error al agregar la entrada.' };
  }
}
