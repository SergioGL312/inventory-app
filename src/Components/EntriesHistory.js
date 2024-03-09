import React, { useState} from "react";
import { View, Text, SafeAreaView, StatusBar, FlatList, StyleSheet, ActivityIndicator } from "react-native";

// API
import { getEntradas } from "../Api/Entries.api";

export default function EntriesHistory() {
  const { entradas, loading } = getEntradas();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={"large"} color={"#5500dc"} />
      </View>
    )
  }

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{item.fecha}</Text>
      </View>
      <View style={styles.entryContainer}>
        <Text style={styles.entryText}>ID de entrada: {item.id_entrada}</Text>
      </View>
      <FlatList
        data={item.productos}
        keyExtractor={(producto, index) => index.toString()}
        renderItem={({ item: producto }) => (
          <View style={styles.productContainer}>
            <Text style={styles.productText}>Nombre producto: {producto.nombre_producto}</Text>
            <Text style={styles.productText}>Cantidad: {producto.cantidad}</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.content} >

        <View style={{
          width: '100%',
          flex: 1,
        }}>
          {entradas.length > 0 ? (
            <>
              <FlatList
                data={entradas}
                renderItem={renderItem}
                keyExtractor={(item) => item.id_entrada.toString()}
              />
            </>
          ) : (
            <View style={styles.noEntriesContainer}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'normal',
                  marginBottom: 20,
                  textAlign: 'center'
                }}
              >No hay entradas</Text>
            </View>
          )}
        </View>

      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  container_header: {
    width: '100%',
    paddingTop: 28,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'yellow'
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'normal',
    marginBottom: 20,
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  dateContainer: {
    marginBottom: 5,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  entryContainer: {
    marginBottom: 5,
  },
  entryText: {
    fontSize: 16,
    color: 'green',
  },
  productContainer: {
    marginLeft: 20,
    marginBottom: 5,
  },
  productText: {
    fontSize: 14,
  },
  noEntriesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});