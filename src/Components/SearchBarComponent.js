import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SearchBarComponent({ searchQuery, onChangeText, clearSearch }) {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder='Buscar productos...'
        clearButtonMode='always'
        autoCorrect={false}
        value={searchQuery}
        onChangeText={onChangeText}
      />
      {searchQuery !== '' && (
        <TouchableOpacity onPress={clearSearch} style={{ width: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text>X</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    marginRight: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
});