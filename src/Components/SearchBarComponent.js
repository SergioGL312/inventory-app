import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SearchBarComponent({ searchQuery, handleSearch, clearSearch }) {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder='Search'
        clearButtonMode='always'
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />
      {searchQuery !== '' && (
        <TouchableOpacity onPress={clearSearch}>
          <Text style={{ color: "#ccc" }}>x</Text>
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