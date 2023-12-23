import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

// CONSTANTS
import { ROUTES } from '../Constants/navigation.constants';

export default function Main({ navigation }) {

  const navigateToInventoryScreen = () => {
    navigation.navigate(ROUTES.inventory)
  }

  const saveData = async (key, data) => {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonData);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };


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

          <TouchableOpacity style={[styles.button, { backgroundColor: '#A4E49C', borderColor: '#A4E49C' }]}>
            <Text style={styles.textButton}>Entrada de almacén</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: '#F1838D', borderColor: '#F1838D' }]}>
            <Text style={styles.textButton}>Salida de almacén</Text>
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