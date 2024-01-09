import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native';
// CONSTANTS
import { ROUTES } from '../Constants/navigation.constants';
// COMPONENTS
import HeaderComponent from '../Components/HeaderComponent';
import ButtonComponent from '../Components/ButtonComponent';

export default function Main({ navigation }) {
  const [countCLick, setCountCLick] = useState(0);

  useEffect(() => {
    if (countCLick === 5) {
      navigation.navigate(ROUTES.admin);
      setCountCLick(0);
    }
  }, [countCLick]);

  const handleButtonClick = () => {
    setCountCLick((prevCount) => prevCount + 1);
    console.log(countCLick + 1);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.content}
      >
        <HeaderComponent />
        <View style={styles.container_buttons}>
          <ButtonComponent
            onPress={() => navigation.navigate(ROUTES.inventory, { pantallaAnterior: 'Main' })}
            imageSource={require('../../assets/image-main/inventario.png')}
            buttonText="Inventario"
            customStyles={{ backgroundColor: '#F7DBA4', borderColor: '#F7DBA4' }}
          />

          <ButtonComponent
            onPress={() => navigation.navigate(ROUTES.incoming)}
            imageSource={require('../../assets/image-main/entradas.png')}
            customImageStyles={{ width: 80 }}
            buttonText="Entrada de almacén"
            customStyles={{ backgroundColor: '#A4E49C', borderColor: '#A4E49C' }}
          />

          <ButtonComponent
            onPress={() => navigation.navigate(ROUTES.outcoming)}
            imageSource={require('../../assets/image-main/salidas.png')}
            customImageStyles={{ width: 80 }}
            buttonText="Salida de almacén"
            customStyles={{ backgroundColor: '#F1838D', borderColor: '#F1838D' }}
          />

          <ButtonComponent
            onPress={() => navigation.navigate(ROUTES.history)}
            imageSource={require('../../assets/image-main/historial.png')}
            buttonText="Ver Historial"
            customStyles={{ backgroundColor: '#80ABE2', borderColor: '#80ABE2' }}
          />

          <ButtonComponent
            onPress={handleButtonClick}
            imageSource={require('../../assets/image-main/unnamed.png')}
            buttonText="Admin"
            customStyles={{ backgroundColor: '#D2B4DE', borderColor: '#D2B4DE' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView >
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
  container_buttons: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});