import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native';

// CONSTANTS
import { ROUTES } from '../Constants/navigation.constants';

export default function Main({ navigation }) {
  const [countCLick, setCountCLick] = useState(0);

  useEffect(() => {
    if (countCLick === 5) {
      navigation.navigate(ROUTES.admin);
      setCountCLick(0);
    }
  }, [countCLick]);

  const navigateToInventoryScreen = () => {
    navigation.navigate(ROUTES.inventory, { pantallaAnterior: 'Main' });
  };
  const navigateToIncommingScreen = () => {
    navigation.navigate(ROUTES.incoming);
  }

  const navigateToOutcomingScreen = () => {
    navigation.navigate(ROUTES.outcoming);
  }

  const navigateToHistoryScreen = () => {
    navigation.navigate(ROUTES.history);
  }

  const handleButtonClick = () => {
    setCountCLick((prevCount) => prevCount + 1);
    console.log(countCLick+1);
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#F7DBA4', borderColor: '#F7DBA4' }]}
              onPress={navigateToInventoryScreen}
            >
              <View style={styles.buttonContent}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../../assets/image-main/inventario.png')}
                    style={styles.buttonImage}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textButton}>Inventario</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#A4E49C', borderColor: '#A4E49C' }]}
              onPress={navigateToIncommingScreen}
            >
              <View style={styles.buttonContent}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../../assets/image-main/entradas.png')}
                    style={[styles.buttonImage, { width: 80 }]}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textButton}>Entrada de almacén</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#F1838D', borderColor: '#F1838D' }]}
              onPress={navigateToOutcomingScreen}
            >
              <View style={styles.buttonContent}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../../assets/image-main/salidas.png')}
                    style={[styles.buttonImage, { width: 80 }]}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textButton}>Salida de almacén</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: '#80ABE2', borderColor: '#80ABE2' }]}
              onPress={navigateToHistoryScreen}
            >
              <View style={styles.buttonContent}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../../assets/image-main/historial.png')}
                    style={styles.buttonImage}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textButton}>Ver Historial</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#D2B4DE', borderColor: '#D2B4DE' }]}
              onPress={handleButtonClick}
            >
              <View style={styles.buttonContent}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../../assets/image-main/unnamed.png')}
                    style={[styles.buttonImage, { borderRadius: 50 }]}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textButton}>Admin</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
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
  },
  container_header: {
    width: '100%',
    height: 226,
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
    // borderWidth: 1,
    // borderColor: 'white',
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
    marginLeft: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: 50,
    height: 50,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }

});