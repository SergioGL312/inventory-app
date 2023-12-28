// import React from 'react';
// import { View, Text } from 'react-native';

// export default function Outcoming() {
//   return (
//     <View>
//       <Text>Outcoming</Text>
//     </View>
//   );
// };

// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// const SelectableList = () => {
//   const [selectedItems, setSelectedItems] = useState([]);

//   const data = [
//     { id: '1', label: 'Elemento 1' },
//     { id: '2', label: 'Elemento 2' },
//     { id: '3', label: 'Elemento 3' },
//     // Agrega más elementos según sea necesario
//   ];

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={[
//         styles.item,
//         selectedItems.includes(item.id) && styles.selectedItem, // Aplica un estilo diferente si está seleccionado
//       ]}
//       onPress={() => toggleItemSelection(item.id)}
//     >
//       <Text>{item.label}</Text>
//     </TouchableOpacity>
//   );

//   const toggleItemSelection = (itemId) => {
//     if (selectedItems.includes(itemId)) {
//       // Si el elemento ya está seleccionado, quítalo de la lista
//       setSelectedItems((prevSelectedItems) =>
//         prevSelectedItems.filter((id) => id !== itemId)
//       );
//     } else {
//       // Si el elemento no está seleccionado, agrégalo a la lista
//       setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId]);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         extraData={selectedItems} // Vuelve a renderizar cuando cambian los elementos seleccionados
//       />
//       <Text>Elementos seleccionados: {selectedItems.join(', ')}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   item: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   selectedItem: {
//     backgroundColor: '#B9B8F8', // Aplica un color de fondo diferente cuando está seleccionado
//   },
// });

// export default SelectableList;



import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Outcoming() {
  return (
    <View style={styles.container}>
      <Text>Outcoming</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'blue' }]}>
          <Text style={styles.buttonText}>Azul</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]}>
          <Text style={styles.buttonText}>Verde</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
  },
  button: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
