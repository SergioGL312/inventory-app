import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';

// ICONS
import Icon from 'react-native-vector-icons/FontAwesome';

// ROUTES
import { ROUTES } from '../Constants/navigation.constants';

export default function Incoming({ navigation, route }) {
  const [currentDate, setCurrentDate] = useState('');
  const selectedItems = route.params?.selectedItems || [];
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  const navigateToProductsScreen = () => {
    navigation.navigate(ROUTES.inventory, { pantallaAnterior: 'Incoming' });
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item}</Text>
      <TextInput
        style={styles.quantityInput}
        placeholder="Cantidad"
        keyboardType="numeric"
        value={quantities[item] ? quantities[item].toString() : ''}
        onChangeText={(text) => handleQuantityChange(item, text)}
      />
    </View>
  );

  const handleQuantityChange = (item, text) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [item]: text.replace(/[^0-9]/g, ''),
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoIncommingContainer}>
        <View style={[styles.dateContainer, { flex: 1 }]}>
          <Text style={{ paddingBottom: 12, fontSize: 16 }}>Fecha entrada:</Text>
          <Text style={{ borderBottomWidth: 1, width: "90%", color: "#616A6B" }}>{currentDate}</Text>
        </View>
        <View style={[styles.noInContainer, { flex: 1 }]}>
          <Text style={{ paddingBottom: 12, fontSize: 16 }}>No. doc.</Text>
          <Text style={{ borderBottomWidth: 1, width: "90%", color: "#616A6B" }}>0000001</Text>
        </View>
      </View>

      {selectedItems.length > 0 ? (
        <>
          <Text>Elementos seleccionados en otra pantalla:</Text>
          <FlatList
            data={selectedItems}
            keyExtractor={(item) => item.toString()}
            renderItem={renderItem}
          />
        </>
      ) : (
        <Text>{selectedItems.length}</Text>
      )}

      <View style={styles.buttonsContainer}>
        {selectedItems.length > 0 ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'green' }]}
            onPress={() => {
              console.log(selectedItems);
            }}
          >
            <Icon name="save" size={30} color="white" />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'blue' }]}
          onPress={navigateToProductsScreen}
        >
          <Icon name="plus" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginLeft: 26,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIncommingContainer: {
    flexDirection: 'row',
    height: 96,
    backgroundColor: "#B9B8F8",
  },
  dateContainer: {
    justifyContent: 'center',
    paddingLeft: 20

  },
  noInContainer: {
    justifyContent: 'center',
    paddingLeft: 20
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
  },
});
