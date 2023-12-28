import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { guardarDatosEnArchivo } from '../Api/Products.api';
// CONSTANTS
import { ROUTES } from '../Constants/navigation.constants';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Main({ navigation }) {

  const navigateToInventoryScreen = () => {
    navigation.navigate(ROUTES.inventory, { pantallaAnterior: 'Main' });
  };
  const navigateToIncommingScreen = () => {
    navigation.navigate(ROUTES.incoming);
  }

  const navigateToOutcomingScreen = () => {
    navigation.navigate(ROUTES.outcoming);
  }

  const verKeys = async () => {
    const keys = await AsyncStorage.getAllKeys();
    if (keys.length > 0) {
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        console.log(key, value);
      }
      guardarDatosEnArchivo("Productos", 'json');
    } else {
      console.log(`There isnt ${keys.length}`);
    }
  }

  async function borrarKeys() {
    console.log("Deleted");
    await AsyncStorage.clear();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.content}>

        <View style={styles.container_header}>
          <View>
            <Text style={styles.bienvenidoText}>Bienvenido!</Text>
          </View>

          <View>
            <Text style={styles.hacerText}>¿Qué deseas hacer?</Text>
          </View>

        </View>

        <View style={styles.container_buttons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#F7DBA4', borderColor: '#F7DBA4' }]}
            onPress={navigateToInventoryScreen}
          >
            <Text style={styles.textButton}>Inventario</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#A4E49C', borderColor: '#A4E49C' }]}
            onPress={navigateToIncommingScreen}
          >
            <Text style={styles.textButton}>Entrada de almacén</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#F1838D', borderColor: '#F1838D' }]}
            onPress={navigateToOutcomingScreen}
          >
            <Text style={styles.textButton}>Salida de almacén</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: '#80ABE2', borderColor: '#80ABE2' }]}
            onPress={verKeys}
          >
            <Text style={styles.textButton}>Ver Storage</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: '#80ABE2', borderColor: '#80ABE2' }]}
            onPress={borrarKeys}
          >
            <Text style={styles.textButton}>Borrar Storage</Text>
          </TouchableOpacity>
        </View>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    // backgroundColor: '#FEF5E7'
  },
  container_header: {
    width: '100%',
    height: 226,
    // backgroundColor: '#ABEBC6',
    paddingTop: 28,
    paddingVertical: 80,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  container_buttons: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    paddingTop: 70,
    // borderColor: '#9B59B6',
    borderColor: 'white',

    // backgroundColor: '#E8DAEF',
  },
  bienvenidoText: {
    fontSize: 48,
    fontWeight: 'normal',
    marginBottom: 20,
  },
  hacerText: {
    fontSize: 18,
    fontWeight: 'normal',
  },
  button: {
    borderRadius: 50,
    borderWidth: 2,
    height: 78,
    width: 310,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'normal',
  }
});