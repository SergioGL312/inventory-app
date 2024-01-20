// productos.js
import { useEffect, useState } from "react";
import { PRODUCTOS as DB_PRODUCTOS, FIREBASE_DB } from "../Api/db";

export const getProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const snapshot = await DB_PRODUCTOS.get();
      const nuevosProductos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      nuevosProductos.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setProductos(nuevosProductos);
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

  return { productos, loading, refetch };
}

// ULTIMO ID
export const getLastIDProductos = async () => {
  try {
    const snapshot = await DB_PRODUCTOS.orderBy('id_producto', 'desc').limit(1).get();
    const utimoDoc = snapshot.docs[0];
    const ultimoId = utimoDoc.data().id_producto + 1;
    return ultimoId;
  } catch (error) {
    console.error('Error al obtener el último ID:', error);
    return null;
  }
};

// Agregar Nuevo Producto
export const addNewProduct = async (datos) => {
  try {
    await DB_PRODUCTOS.add(datos);
    return { success: true, message: 'Nuevo producto agregado correctamente.' };
  } catch (error) {
    console.error("Error al agregar el nuevo producto:", error);
    return { success: false, message: 'Error al agregar el nuevo producto.' };
  }
}

// Acutializar nombre o  stock producto
export const updateProducto = async (id, nuevosDatos) => {
  try {
    await DB_PRODUCTOS.doc(id).update(nuevosDatos);
  } catch (error) {
    console.error('Error al actualizar el documento en Firestore: ', error);
  }
}

export const editEntriesProductos = async (id, cant) => {
  try {
    const entradasNumero = Number(cant);

    const result = await FIREBASE_DB.runTransaction(async (transaction) => {
      const querySnapshot = await DB_PRODUCTOS.where('id_producto', '==', id).get();

      if (querySnapshot.empty) {
        return { success: false, message: `No se encontró ningún documento con id_producto ${id}.` };
      }

      const docRef = querySnapshot.docs[0].ref;
      const doc = await transaction.get(docRef);

      if (!doc.exists) {
        return { success: false, message: `El documento con id_producto ${id} no existe.` };
      }

      const entradas = (doc.data().entradas || 0) + entradasNumero;

      transaction.update(docRef, { entradas: entradas });

      return { success: true, message: 'Entradas actualizadas correctamente.' };
    });

    return result;
  } catch (error) {
    console.error('Error al actualizar el campo:', error);
    return { success: false, message: 'Error al actualizar el campo.' };
  }
}

export const editOutputsProductos = async (id, cant) => {
  try {
    const salidasNumero = Number(cant);

    const result = await FIREBASE_DB.runTransaction(async (transaction) => {
      const querySnapshot = await DB_PRODUCTOS.where('id_producto', '==', id).get();

      if (querySnapshot.empty) {
        return { success: false, message: `No se encontró ningún documento con id_producto ${id}.` };
      }

      const docRef = querySnapshot.docs[0].ref;
      const doc = await transaction.get(docRef);

      if (!doc.exists) {
        return { success: false, message: `El documento con id_producto ${id} no existe.` };
      }

      const salidas = (doc.data().salidas || 0) + salidasNumero;

      transaction.update(docRef, { salidas: salidas });

      return { success: true, message: 'Venta actualizadas correctamente.' };
    });

    return result;
  } catch (error) {
    console.error('Error al actualizar el campo:', error);
    return { success: false, message: 'Error al actualizar el campo.' };
  }
}

export const updateStock = async (idProducto, cant, isEntrada) => {
  try {
    const cantNumero = Number(cant);

    const result = await FIREBASE_DB.runTransaction(async (transaction) => {
      const querySnapshot = await DB_PRODUCTOS.where('id_producto', '==', idProducto).get();

      if (querySnapshot.empty) {
        return { success: false, message: `No se encontró ningún documento con id_producto ${idProducto}.` };
      }

      const docRef = querySnapshot.docs[0].ref;
      const doc = await transaction.get(docRef);

      if (!doc.exists) {
        return { success: false, message: `El documento con id_producto ${idProducto} no existe.` };
      }

      let stock = doc.data().stock_actual;

      if (isEntrada) {
        stock += cantNumero;
      } else {
        stock -= cantNumero;
      }

      // Actualiza el campo 'stock_actual' dentro de la transacción
      transaction.update(docRef, { stock_actual: stock });

      return { success: true, message: 'Stock actualizado correctamente.' };
    });

    return result;
  } catch (error) {
    console.error('Error al actualizar el campo:', error);
    return { success: false, message: 'Error al actualizar el campo.' };
  }
}
